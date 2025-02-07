import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CopyButton from "./CopyButton";

describe("CopyButton", () => {
	beforeEach(() => {
		Object.assign(navigator, {
			clipboard: {
				writeText: vi.fn(),
			},
		});
	});

	it("renders correctly", () => {
		render(<CopyButton text="test" />);
		expect(
			screen.getByRole("button", { name: "Copy" })
		).toBeInTheDocument();
	});

	it("copies the text when clicked", async () => {
		render(<CopyButton text="test" />);
		const button = screen.getByRole("button", { name: "Copy" });
		fireEvent.click(button);
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test");
		await waitFor(() =>
			expect(screen.getByText("Copied!")).toBeInTheDocument()
		);
	});

	it("resets the button after 2 seconds", async () => {
		vi.useFakeTimers();

		render(<CopyButton text="test" />);
		const button = screen.getByRole("button", { name: "Copy" });
		fireEvent.click(button);

		vi.advanceTimersByTime(2000);

		expect(
			screen.getByRole("button", { name: "Copy" })
		).toBeInTheDocument();

		vi.useRealTimers();
	});
});
