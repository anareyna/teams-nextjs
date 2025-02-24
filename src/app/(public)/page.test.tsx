import { QUESTION_CATEGORIES } from "@/lib/constants";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: pushMock,
	}),
}));

describe("Home Page", () => {
	beforeEach(() => {
		pushMock.mockClear();
		render(<Home />);
	});

	it("displays all categories on initial render", () => {
		QUESTION_CATEGORIES.forEach((category) => {
			expect(screen.getByText(category.title)).toBeInTheDocument();
		});
	});

	it("navigates to /work/list when Work category and List Mode are selected", async () => {
		const firstCategory = screen.getByText(QUESTION_CATEGORIES[0].title);
		fireEvent.click(firstCategory);

		const listMode = screen.getByText(/List Mode/i);
		fireEvent.click(listMode);
		expect(pushMock).toHaveBeenCalledWith(
			`/${QUESTION_CATEGORIES[0].slug}/list`
		);
	});

	it("navigates to /friends/list when Friends category and List Mode are selected", async () => {
		const secondCategory = screen.getByText(QUESTION_CATEGORIES[1].title);
		fireEvent.click(secondCategory);

		const listMode = screen.getByText(/List Mode/i);
		fireEvent.click(listMode);
		expect(pushMock).toHaveBeenCalledWith(
			`/${QUESTION_CATEGORIES[1].slug}/list`
		);
	});

	it("back button returns to category selection", () => {
		const firstCategory = screen.getByText(QUESTION_CATEGORIES[0].title);
		fireEvent.click(firstCategory);

		const backButton = screen.getByText(/Back/i);
		fireEvent.click(backButton);

		QUESTION_CATEGORIES.forEach((category) => {
			expect(screen.getByText(category.title)).toBeInTheDocument();
		});
	});
});
