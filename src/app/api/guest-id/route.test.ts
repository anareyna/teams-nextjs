import { getOrCreateGuestId } from "@/lib/guestId";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

vi.mock("@/lib/guestId", () => ({
	getOrCreateGuestId: vi.fn(),
}));

describe("GET /api/guestId", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("should return a guest ID", async () => {
		const mockGuestId = "test-guest-id-123";
		vi.mocked(getOrCreateGuestId).mockResolvedValue(mockGuestId);

		const response = await GET();

		expect(getOrCreateGuestId).toHaveBeenCalled();
		expect(response.status).toBe(200);

		const json = await response.json();
		expect(json).toEqual({ guestId: mockGuestId });
	});
});
