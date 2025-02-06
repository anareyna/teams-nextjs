import { act, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import Home from "./page";

const mockQuestions = [
	"What's your name",
	"How old are you",
	"What's your favorite animal",
];

const handlers = [
	http.get("http://localhost:3000/api/questions", () => {
		return HttpResponse.json(mockQuestions);
	}),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders the page with fetched questions", async () => {
	await act(async () => {
		render(await Home());
	});

	expect(screen.getByText(mockQuestions[0])).toBeInTheDocument();
	expect(screen.getByText(mockQuestions[1])).toBeInTheDocument();
	expect(screen.getByText(mockQuestions[2])).toBeInTheDocument();
});

it("handles API errors gracefully", async () => {
	server.use(
		http.get("http://localhost:3000/api/questions", () => {
			return new HttpResponse(null, { status: 500 });
		})
	);

	try {
		await act(async () => {
			render(await Home());
		});
	} catch (error) {
		expect(error).toBeTruthy();
	}
});
