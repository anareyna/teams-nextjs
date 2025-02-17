import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import QuestionCard from "./QuestionCard";

describe("QuestionCard component", () => {
	it("renders the initial state", () => {
		render(<QuestionCard text="q1" index={0} />);
		expect(screen.getByText("Question 1")).toBeInTheDocument();
		expect(screen.getByText("q1")).toBeInTheDocument();
	});

	it("renders the loading state", () => {
		render(<QuestionCard isLoadingCard={true} index={0} text="anything" />);
		const skeleton = screen.getByTestId("question-card-skeleton");
		expect(skeleton).toHaveClass("w-full h-[20px] rounded-full");
		expect(screen.queryByText("anything")).not.toBeInTheDocument();
	});
});
