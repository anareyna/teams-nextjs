import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SharedBlock from "./SharedBlock";

describe("SharedBlock component", () => {
	it("renders the initial state", () => {
		render(
			<SharedBlock
				isLoading={false}
				numberOfQuestions={3}
				shareUrl="https://example.com"
			/>
		);
		expect(
			screen.getByText((content) =>
				content.includes("Your questions are ready!")
			)
		).toBeInTheDocument();
		expect(screen.getByText("https://example.com")).toBeInTheDocument();
	});

	it("renders the loading state", () => {
		render(
			<SharedBlock
				isLoading={true}
				numberOfQuestions={3}
				shareUrl="https://example.com"
			/>
		);
		expect(
			screen.getByText((content) =>
				content.includes("Generating your shared link...")
			)
		).toBeInTheDocument();
	});

	it("shows different text when there is just one question", () => {
		render(
			<SharedBlock
				isLoading={false}
				numberOfQuestions={1}
				shareUrl="https://example.com"
			/>
		);
		expect(
			screen.getByText((content) =>
				content.includes("Your question is ready!")
			)
		).toBeInTheDocument();
	});
});
