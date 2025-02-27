import { db } from "@/drizzle/db";
import { sharedQuestionsTable } from "@/drizzle/schema";
import { QUESTION_MODES } from "@/lib/constants";
import { NextResponse } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

vi.mock("@/drizzle/db", () => ({
	db: {
		insert: vi.fn().mockReturnValue({
			values: vi.fn().mockResolvedValue([{ slug: "abc123" }]),
		}),
		query: {
			sharedQuestionsTable: {
				findFirst: vi.fn().mockResolvedValue(null),
			},
		},
	},
}));

vi.mock("@/drizzle/schema", () => ({
	sharedQuestionsTable: {},
}));

vi.mock("crypto", () => ({
	default: {
		randomBytes: vi.fn().mockReturnValue({
			toString: vi.fn().mockReturnValue("abc123"),
		}),
	},
}));

describe("POST /api/questions/save", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should create a new shared questions entry", async () => {
		const mockRequest = new Request(
			"http://localhost:3000/api/questions/save",
			{
				method: "POST",
				body: JSON.stringify({
					questionIds: ["q1", "q2", "q3"],
					mode: "list",
					guestId: "guest123",
				}),
			}
		);

		const response = await POST(mockRequest);
		const data = await response.json();

		expect(response).toBeInstanceOf(NextResponse);
		expect(data).toEqual({ slug: "abc123" });

		expect(db.insert).toHaveBeenCalledWith(sharedQuestionsTable);
		expect(db.insert(sharedQuestionsTable).values).toHaveBeenCalledWith(
			expect.objectContaining({
				slug: "abc123",
				questionIds: ["q1", "q2", "q3"],
				mode: "list",
				guestId: "guest123",
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			})
		);
	});

	it("should handle missing questionIds with 400 error", async () => {
		const mockRequest = new Request(
			"http://localhost:3000/api/questions/save",
			{
				method: "POST",
				body: JSON.stringify({ mode: "list" }),
			}
		);

		const response = await POST(mockRequest);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			error: "questionIds must be a non-empty array",
		});
	});

	it("should handle empty questionIds array with 400 error", async () => {
		const mockRequest = new Request(
			"http://localhost:3000/api/questions/save",
			{
				method: "POST",
				body: JSON.stringify({
					questionIds: [],
					mode: "list",
				}),
			}
		);

		const response = await POST(mockRequest);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			error: "questionIds must be a non-empty array",
		});
	});

	it("should handle invalid mode with 400 error", async () => {
		const mockRequest = new Request(
			"http://localhost:3000/api/questions/save",
			{
				method: "POST",
				body: JSON.stringify({
					questionIds: ["q1", "q2", "q3"],
					mode: "random",
					guestId: "guest123",
				}),
			}
		);

		const response = await POST(mockRequest);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			error: `Invalid mode. Must be one of: ${QUESTION_MODES.join(", ")}`,
		});
	});

	it("should handle missing mode with 400 error", async () => {
		const mockRequest = new Request(
			"http://localhost:3000/api/questions/save",
			{
				method: "POST",
				body: JSON.stringify({
					questionIds: ["q1", "q2", "q3"],
					guestId: "guest123",
				}),
			}
		);

		const response = await POST(mockRequest);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			error: `Invalid mode. Must be one of: ${QUESTION_MODES.join(", ")}`,
		});
	});

	it("should handle internal server errors with 500 status", async () => {
		vi.mocked(db.insert).mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const mockRequest = new Request(
			"http://localhost:3000/api/questions/save",
			{
				method: "POST",
				body: JSON.stringify({
					questionIds: ["q1", "q2", "q3"],
					mode: "list",
					guestId: "guest123",
				}),
			}
		);

		const response = await POST(mockRequest);
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data).toEqual({
			error: "Internal server error: Error: Database error",
		});
	});
});
