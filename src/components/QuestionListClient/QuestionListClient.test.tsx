import * as actions from "@/lib/actions";
import { QUESTION_CATEGORIES } from "@/lib/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuestionListClient from "./QuestionListClient";

vi.spyOn(actions, "generateSharedUrl").mockResolvedValue("abc123");

describe("QuestionListClient", () => {
	it("fetches and displays questions on load", async () => {
		render(
			<QuestionListClient
				initialQuestionCount={3}
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText("q1")).toBeInTheDocument();
			expect(screen.getByText("q2")).toBeInTheDocument();
			expect(screen.getByText("q3")).toBeInTheDocument();
		});
	});

	it("fetches new questions when shuffle button is clicked", async () => {
		render(
			<QuestionListClient
				initialQuestionCount={2}
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		await waitFor(() => expect(screen.getByText("q1")).toBeInTheDocument());

		fireEvent.click(screen.getByRole("button", { name: /new questions/i }));

		await waitFor(() => expect(screen.getByText("q2")).toBeInTheDocument());
	});

	it("increases the number of questions when + is clicked", async () => {
		render(
			<QuestionListClient
				initialQuestionCount={2}
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: "+" }));

		await waitFor(() => expect(screen.getByText("q3")).toBeInTheDocument());
	});

	it("decreases the number of questions when - is clicked", async () => {
		render(
			<QuestionListClient
				initialQuestionCount={3}
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: "-" }));

		await waitFor(() =>
			expect(screen.queryByText("q3")).not.toBeInTheDocument()
		);
	});

	it("generates and displays a shareable URL", async () => {
		render(
			<QuestionListClient
				initialQuestionCount={3}
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);
		const shareButton = await screen.findByRole("button", {
			name: /share this list/i,
		});

		expect(shareButton).not.toBeDisabled();
		fireEvent.click(shareButton);

		await waitFor(() =>
			expect(screen.getByText(/shared\/abc123/i)).toBeInTheDocument()
		);
	});

	it("should render QuestionCardList component when useFlipCards prop is false or not present", () => {
		render(
			<QuestionListClient
				initialQuestionCount={3}
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);
		expect(screen.queryByTestId("flip-card-list")).not.toBeInTheDocument();
		expect(screen.getByTestId("question-list")).toBeInTheDocument();
	});

	it("should render FlipCardList component when useFlipCards prop is true", () => {
		render(
			<QuestionListClient
				initialQuestionCount={3}
				categoryId={QUESTION_CATEGORIES[0].id}
				useFlipCards={true}
			/>
		);
		expect(screen.queryByTestId("question-list")).not.toBeInTheDocument();
		expect(screen.getByTestId("flip-card-list")).toBeInTheDocument();
	});
});
