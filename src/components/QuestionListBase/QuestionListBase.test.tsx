import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CardProps } from "@/types/types";
import QuestionListBase from "./QuestionListBase";

const MockCard = ({ text, index, isLoadingCard }: CardProps) => (
	<div data-testid="card" data-index={index} data-loading={isLoadingCard}>
		{text}
	</div>
);

describe("QuestionListBase component", () => {
	it("renders the correct number of cards when questions are provided", () => {
		const mockQuestions = [
			{ id: "q1", text: "Question 1" },
			{ id: "q2", text: "Question 2" },
		];

		render(
			<QuestionListBase
				numberOfQuestions={2}
				questions={mockQuestions}
				isLoading={false}
				CardComponent={MockCard}
			/>
		);

		const cards = screen.getAllByTestId("card");
		expect(cards).toHaveLength(2);
		expect(cards[0]).toHaveTextContent("Question 1");
		expect(cards[1]).toHaveTextContent("Question 2");
	});

	it("renders loading placeholders when `isLoading` is true", () => {
		render(
			<QuestionListBase
				numberOfQuestions={3}
				questions={[]}
				isLoading={true}
				CardComponent={MockCard}
			/>
		);

		const cards = screen.getAllByTestId("card");
		expect(cards).toHaveLength(3);
		cards.forEach((card) => {
			expect(card).toHaveAttribute("data-loading", "true");
			expect(card).toHaveTextContent("");
		});
	});

	it("renders an empty state if no questions are provided and not loading", () => {
		render(
			<QuestionListBase
				numberOfQuestions={0}
				questions={[]}
				isLoading={false}
				CardComponent={MockCard}
			/>
		);

		const cards = screen.queryAllByTestId("card");
		expect(cards).toHaveLength(0);
	});
});
