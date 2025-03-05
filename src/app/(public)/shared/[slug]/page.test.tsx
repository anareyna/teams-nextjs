import { mockQuestions } from "@/mocks/test-data/questions";
import { Question } from "@/types/types";
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { beforeAll, expect, it, vi } from "vitest";
import SharedPage from "./page";

vi.mock("next/navigation", () => ({
	notFound: vi.fn(),
}));

vi.mock("@/components/QuestionList/QuestionList", () => ({
	default: vi.fn(({ questions }) => (
		<div data-testid="list-card-grid">
			{questions.map((q: Question) => (
				<div key={q.id}>{q.text}</div>
			))}
		</div>
	)),
}));

beforeAll(() => {
	process.env.NEXT_PUBLIC_BASE_URL = "";
});

it("should render shared questions successfully", async () => {
	const mockParams = Promise.resolve({ slug: "abc123" });
	render(await SharedPage({ params: mockParams }));

	expect(screen.getByText(/You're in!/i)).toBeInTheDocument();

	mockQuestions.forEach((question) => {
		expect(screen.getByText(question.text)).toBeInTheDocument();
	});
});

it("should call notFound() when API returns non-ok response", async () => {
	const mockParams = Promise.resolve({ slug: "invalid-slug" });

	try {
		await SharedPage({ params: mockParams });
	} catch (error) {
		expect(error).toBeInstanceOf(Error);
	}

	expect(notFound).toHaveBeenCalled();
});

it("should handle API errors gracefully", async () => {
	process.env.NEXT_PUBLIC_BASE_URL = "";

	const mockParams = Promise.resolve({ slug: "abc123", mode: "list" });

	try {
		await SharedPage({ params: mockParams });
	} catch (error) {
		expect(error).toBeInstanceOf(Error);
	}
});

it("should pass correct props to QuestionList component", async () => {
	const mockParams = Promise.resolve({ slug: "abc123", mode: "list" });
	render(await SharedPage({ params: mockParams }));

	const questionList = screen.getByTestId("list-card-grid");
	expect(questionList).toBeInTheDocument();

	mockQuestions.forEach((question) => {
		expect(screen.getByText(question.text)).toBeInTheDocument();
	});
});
