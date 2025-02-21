import * as actions from "@/lib/actions";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuestionListClient from "./QuestionListClient";

vi.spyOn(actions, "generateSharedUrl").mockResolvedValue("abc123");

describe("QuestionListClient", () => {
	it("fetches and displays questions on load", async () => {
		render(<QuestionListClient initialQuestionCount={3} />);

		await waitFor(() => {
			expect(screen.getByText("q1")).toBeInTheDocument();
			expect(screen.getByText("q2")).toBeInTheDocument();
			expect(screen.getByText("q3")).toBeInTheDocument();
		});
	});

	it("fetches new questions when shuffle button is clicked", async () => {
		render(<QuestionListClient initialQuestionCount={2} />);

		await waitFor(() => expect(screen.getByText("q1")).toBeInTheDocument());

		fireEvent.click(
			screen.getByRole("button", { name: /get new questions/i })
		);

		await waitFor(() => expect(screen.getByText("q2")).toBeInTheDocument());
	});

	it("increases the number of questions when + is clicked", async () => {
		render(<QuestionListClient initialQuestionCount={2} />);

		fireEvent.click(screen.getByRole("button", { name: "+" }));

		await waitFor(() => expect(screen.getByText("q3")).toBeInTheDocument());
	});

	it("decreases the number of questions when - is clicked", async () => {
		render(<QuestionListClient initialQuestionCount={3} />);

		fireEvent.click(screen.getByRole("button", { name: "-" }));

		await waitFor(() =>
			expect(screen.queryByText("q3")).not.toBeInTheDocument()
		);
	});

	it("generates and displays a shareable URL", async () => {
		render(<QuestionListClient initialQuestionCount={3} />);

		fireEvent.click(
			screen.getByRole("button", { name: /share this list/i })
		);

		await waitFor(() =>
			expect(screen.getByText(/shared\/abc123/i)).toBeInTheDocument()
		);
	});
});
