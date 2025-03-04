import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ListCardGrid from "./ListCardGrid";

describe("ListCardGrid component", () => {
	const mockQuestions = [
		{ id: "1", text: "q1" },
		{ id: "2", text: "q2" },
		{ id: "3", text: "q3" },
	];

	it("renders the loading skeleton when loading is true", () => {
		render(<ListCardGrid questions={[]} isLoading={true} />);
		const loadingCards = screen.getAllByTestId("question-card-skeleton");
		expect(loadingCards).toHaveLength(3);
	});

	it("renders the questions when loading is false", () => {
		render(<ListCardGrid questions={mockQuestions} isLoading={false} />);

		const questionCards = screen.getAllByTestId(/^question-card-/);
		expect(questionCards).toHaveLength(3);

		mockQuestions.forEach((question, index) => {
			expect(
				screen.getByTestId(`question-card-${index}`)
			).toHaveTextContent(question.text);
		});
	});
});
