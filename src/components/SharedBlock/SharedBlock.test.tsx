import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SharedBlock from "./SharedBlock";

describe("SharedBlock component", () => {
	it("renders the initial state", () => {
		render(<SharedBlock shareUrl="https://example.com" />);
		expect(screen.getByText("https://example.com")).toBeInTheDocument();
	});
});
