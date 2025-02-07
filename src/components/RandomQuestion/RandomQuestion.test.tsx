import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RandomQuestion from "./RandomQuestion";

const mockQuestions = [
	{ id: 1, question: "What's your name" },
	{ id: 2, question: "How old are you" },
	{ id: 3, question: "What's your favorite animal" },
	{ id: 4, question: "Where are you from" },
	{ id: 5, question: "Who is your favorite author" },
];

describe("RandomQuestion component", () => {
	it("renders 3 random questions by default", () => {
		render(<RandomQuestion questions={mockQuestions} />);
		const questionsItems = screen.getAllByRole("listitem");
		expect(questionsItems).toHaveLength(3);
	});

	it("should increase the rendered questions when clicking on +", async () => {
		render(<RandomQuestion questions={mockQuestions} />);
		expect(await screen.findAllByRole("listitem")).toHaveLength(3);
		const plusButton = screen.getByRole("button", { name: "+" });
		fireEvent.click(plusButton);
		expect(await screen.findAllByRole("listitem")).toHaveLength(4);
	});

	it("should decrease the rendered questions when clicking on -", async () => {
		render(<RandomQuestion questions={mockQuestions} />);
		expect(await screen.findAllByRole("listitem")).toHaveLength(3);
		const minusButton = screen.getByRole("button", { name: "-" });
		fireEvent.click(minusButton);
		expect(await screen.findAllByRole("listitem")).toHaveLength(2);
	});

	it("fetches and displays new random questions when clicking Get new questions button", async () => {
		render(<RandomQuestion questions={mockQuestions} />);
		const initialQuestions = await screen.findAllByRole("listitem");
		const initialTexts = initialQuestions.map(
			(question) => question.textContent
		);

		const getNewQuestionsButton = screen.getByRole("button", {
			name: "Get New Questions",
		});
		fireEvent.click(getNewQuestionsButton);

		const newQuestions = await screen.findAllByRole("listitem");
		const newTexts = newQuestions.map((question) => question.textContent);

		expect(newTexts).not.toEqual(initialTexts);
	});
});
