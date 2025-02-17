import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuestionControls from "./QuestionControls";

describe("QuestionControls", () => {
	it("renders the initial state", () => {
		render(
			<QuestionControls
				numberOfQuestions={3}
				onIncrease={() => {}}
				onDecrease={() => {}}
			/>
		);

		expect(
			screen.getByText((content) => content.includes("Choose from"))
		).toBeInTheDocument();
		expect(
			screen.getByText((content) => content.includes("3"))
		).toBeInTheDocument();
		expect(
			screen.getByText((content) => content.includes("questions"))
		).toBeInTheDocument();
	});

	it('calls onDecrease when the "-" button is clicked', () => {
		const mockDecrease = vi.fn();
		render(
			<QuestionControls
				numberOfQuestions={3}
				onIncrease={() => {}}
				onDecrease={mockDecrease}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: "-" }));
		expect(mockDecrease).toHaveBeenCalledTimes(1);
	});

	it('calls onIncrease when the "+" button is clicked', () => {
		const mockIncrease = vi.fn();
		render(
			<QuestionControls
				numberOfQuestions={3}
				onIncrease={mockIncrease}
				onDecrease={() => {}}
			/>
		);
		fireEvent.click(screen.getByRole("button", { name: "+" }));
		expect(mockIncrease).toHaveBeenCalledTimes(1);
	});

	it('disables the "-" button when the number of questions is 1', () => {
		render(
			<QuestionControls
				numberOfQuestions={1}
				onIncrease={() => {}}
				onDecrease={() => {}}
			/>
		);

		expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
	});
});
