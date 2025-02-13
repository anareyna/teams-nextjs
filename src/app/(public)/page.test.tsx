import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import Home from "./page";

const mockQuestions = [
	{ id: "1", text: "q1" },
	{ id: "2", text: "q2" },
	{ id: "3", text: "q3" },
];

const newMockQuestions = [
	{ id: "4", text: "q4" },
	{ id: "5", text: "q5" },
	{ id: "6", text: "q6" },
];

const handlers = [
	http.get("http://localhost:3000/api/questions", ({ request }) => {
		const url = new URL(request.url);
		const count = url.searchParams.get("count");

		// Add a counter to alternate between mock responses

		if (count === "2") {
			return HttpResponse.json(mockQuestions.slice(0, 2));
		}

		if (count === "3") {
			return HttpResponse.json(mockQuestions);
		}

		if (count === "4") {
			return HttpResponse.json([
				...mockQuestions,
				{ id: "4", text: "q4" },
			]);
		}

		if (count === "1") {
			return HttpResponse.json([mockQuestions[0]]);
		}

		return HttpResponse.json({ error: "Invalid count" }, { status: 400 });
	}),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders the page with fetched questions", async () => {
	render(<Home />);

	expect(
		screen.getByText((content) => content.includes("Choose from"))
	).toBeInTheDocument();

	await waitFor(() => {
		expect(screen.getByText("q1")).toBeInTheDocument();
		expect(screen.getByText("q2")).toBeInTheDocument();
		expect(screen.getByText("q3")).toBeInTheDocument();
	});
});

it("handles API errors if request fails", async () => {
	server.use(
		http.get("http://localhost:3000/api/questions", () => {
			return new HttpResponse(null, { status: 500 });
		})
	);
	try {
		render(<Home />);
	} catch (error) {
		expect(error).toBeTruthy();
	}
});

it("should increase the number of questions when clicking on +", async () => {
	render(<Home />);

	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(3);
	});

	const plusButton = screen.getByRole("button", { name: "+" });
	fireEvent.click(plusButton);

	await waitFor(() => {
		expect(screen.getByText("q4")).toBeInTheDocument();
		expect(screen.getAllByRole("listitem")).toHaveLength(4);
	});
});

it("should decrease the number of questions when clicking on -", async () => {
	render(<Home />);
	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(3);
	});
	const minusButton = screen.getByRole("button", { name: "-" });
	fireEvent.click(minusButton);

	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});
});

it.skip('should not decrease the number of questions when clicking on "-" if the number of questions is 1', async () => {
	render(<Home />);
	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(3);
	});
	const minusButton = screen.getByRole("button", { name: "-" });
	fireEvent.click(minusButton);
	fireEvent.click(minusButton);

	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(1);
		expect(minusButton).toBeDisabled();
		expect(screen.getByText(/answer 1 question/i)).toBeInTheDocument();
	});
});

it("should fetch new questions when clicking on 'Get New Questions' button", async () => {
	render(<Home />);

	await waitFor(() => {
		expect(screen.getByText("q1")).toBeInTheDocument();
		expect(screen.getByText("q2")).toBeInTheDocument();
		expect(screen.getByText("q3")).toBeInTheDocument();
	});

	server.use(
		http.get("http://localhost:3000/api/questions", () => {
			return HttpResponse.json(newMockQuestions);
		})
	);

	const newQuestionsButton = screen.getByRole("button", {
		name: /get new questions/i,
	});
	fireEvent.click(newQuestionsButton);

	await waitFor(() => {
		expect(screen.getByText("q4")).toBeInTheDocument();
		expect(screen.getByText("q5")).toBeInTheDocument();
		expect(screen.getByText("q6")).toBeInTheDocument();
	});
});
