import { beforeEach, expect, test, vi } from "vitest";
import { getOrCreateGuestId } from "./guestId";

const mockGet = vi.fn();
const mockSet = vi.fn();

vi.mock("next/headers", () => ({
	cookies: vi.fn(() => ({
		get: mockGet,
		set: mockSet,
	})),
}));

Object.defineProperty(window, "crypto", {
	value: {
		randomUUID: vi.fn().mockReturnValue("test-uuid-123"),
	},
	configurable: true,
});

beforeEach(() => {
	vi.clearAllMocks();
});

test("should return existing guestId if cookie exists", async () => {
	mockGet.mockReturnValue({ value: "existing-guest-id" });

	const result = await getOrCreateGuestId();

	expect(result).toBe("existing-guest-id");
	expect(mockGet).toHaveBeenCalledWith("guestId");
	expect(mockSet).not.toHaveBeenCalled();
});

test("should create and set new guestId if cookie does not exist", async () => {
	mockGet.mockReturnValue(undefined);

	const result = await getOrCreateGuestId();

	expect(result).toBe("test-uuid-123");
	expect(mockGet).toHaveBeenCalledWith("guestId");
	expect(mockSet).toHaveBeenCalledWith("guestId", "test-uuid-123", {
		httpOnly: true,
		secure: expect.any(Boolean),
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 30,
	});
});
