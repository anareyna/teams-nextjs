import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import QuestionList from "./QuestionList";

describe("QuestionList component", () => {
	const mockQuestions = [
		{ id: "1", text: "q1" },
		{ id: "2", text: "q2" },
		{ id: "3", text: "q3" },
	];

	it("renders the loading skeleton when loading is true", () => {
		render(
			<QuestionList
				questions={[]}
				isLoading={true}
				numberOfQuestions={3}
			/>
		);
		const loadingCards = screen.getAllByTestId("question-card-skeleton");
		expect(loadingCards).toHaveLength(3);
	});

	it("renders the questions when loading is false", () => {
		render(
			<QuestionList
				questions={mockQuestions}
				numberOfQuestions={3}
				isLoading={false}
			/>
		);

		const questionCards = screen.getAllByTestId(/^question-card-/);
		expect(questionCards).toHaveLength(3);

		mockQuestions.forEach((question, index) => {
			expect(
				screen.getByTestId(`question-card-${index}`)
			).toHaveTextContent(question.text);
		});
	});

	it('renders a title when the "title" prop is passed', () => {
		render(
			<QuestionList
				title="Test title"
				questions={mockQuestions}
				numberOfQuestions={3}
				isLoading={false}
			/>
		);
		expect(screen.getByText("Test title")).toBeInTheDocument();
	});
});
