import { server } from "@/mocks/server";
import { newMockQuestions } from "@/mocks/test-data/questions";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { expect, it } from "vitest";
import Home from "./page";

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
		http.get("/api/questions", () => {
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

it("should disable minus button when having only 1 question", async () => {
	render(<Home />);

	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(3);
	});

	const minusButton = screen.getByRole("button", { name: "-" });

	fireEvent.click(minusButton);
	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
		expect(minusButton).not.toBeDisabled();
	});

	fireEvent.click(minusButton);
	await waitFor(() => {
		expect(screen.getAllByRole("listitem")).toHaveLength(1);
		expect(minusButton).toBeDisabled();
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
		http.get("/api/questions", () => {
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
