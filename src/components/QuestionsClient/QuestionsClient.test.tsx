import * as actions from "@/lib/actions";
import {
	DEFAULT_INITIAL_LIST_COUNT,
	DEFAULT_INITIAL_MYSTERY_COUNT,
	QUESTION_CATEGORIES,
} from "@/lib/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuestionsClient from "./QuestionsClient";

vi.spyOn(actions, "generateSharedUrl").mockResolvedValue("abc123");

describe("QuestionsClient", () => {
	it("fetches and displays questions on load", async () => {
		render(
			<QuestionsClient
				mode="list"
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText("q1")).toBeInTheDocument();
			expect(screen.getByText("q2")).toBeInTheDocument();
			expect(screen.getByText("q3")).toBeInTheDocument();
			expect(screen.getAllByRole("listitem")).toHaveLength(
				DEFAULT_INITIAL_LIST_COUNT
			);
		});
	});

	it("fetches new questions when shuffle button is clicked", async () => {
		render(
			<QuestionsClient
				mode="list"
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		await waitFor(() => expect(screen.getByText("q1")).toBeInTheDocument());

		fireEvent.click(screen.getByRole("button", { name: /new questions/i }));

		await waitFor(() => expect(screen.getByText("q2")).toBeInTheDocument());
	});

	it("increases the number of questions when + is clicked", async () => {
		render(
			<QuestionsClient
				mode="list"
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: "+" }));

		await waitFor(() => expect(screen.getByText("q3")).toBeInTheDocument());
	});

	it("decreases the number of questions when - is clicked", async () => {
		render(
			<QuestionsClient
				mode="list"
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
			<QuestionsClient
				mode="list"
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);
		const shareButton = await screen.findByRole("button", {
			name: /share list/i,
		});

		expect(shareButton).not.toBeDisabled();
		fireEvent.click(shareButton);

		await waitFor(() =>
			expect(screen.getByText(/shared\/abc123/i)).toBeInTheDocument()
		);
	});

	it("should render QuestionCardList component when mode prop is 'list'", () => {
		render(
			<QuestionsClient
				mode="list"
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);
		expect(screen.queryByTestId("flip-card-grid")).not.toBeInTheDocument();
		expect(screen.getByTestId("list-card-grid")).toBeInTheDocument();
	});

	it("should render FlipCardList component when mode prop is 'mystery'", () => {
		render(
			<QuestionsClient
				mode="mystery"
				categoryId={QUESTION_CATEGORIES[0].id}
			/>
		);
		expect(screen.queryByTestId("list-card-grid")).not.toBeInTheDocument();
		expect(screen.getByTestId("flip-card-grid")).toBeInTheDocument();
		expect(screen.getAllByRole("listitem")).toHaveLength(
			DEFAULT_INITIAL_MYSTERY_COUNT
		);
	});
});
