import { getCookie, setCookie } from "cookies-next";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { GET } from "./route";

vi.mock("cookies-next", () => ({
	getCookie: vi.fn(),
	setCookie: vi.fn(),
}));

vi.stubGlobal("crypto", {
	randomUUID: vi.fn(() => "mocked-uuid"),
});

describe("GET /api/guest-id", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should create a new guestId if it does not exist", async () => {
		(getCookie as Mock).mockReturnValueOnce(undefined);

		const req = {
			cookies: new Map(),
		} as unknown as NextRequest;

		const response = await GET(req);

		expect(setCookie).toHaveBeenCalledWith(
			"guestId",
			"mocked-uuid",
			expect.objectContaining({ req })
		);

		const data = await response.json();
		expect(data.guestId).toBe("mocked-uuid");
	});

	it("should return the existing guestId if it already exists", async () => {
		(getCookie as Mock).mockReturnValueOnce("existing-guest-id");

		const req = {
			cookies: new Map([["guestId", "existing-guest-id"]]),
		} as unknown as NextRequest;

		const response = await GET(req);

		expect(setCookie).not.toHaveBeenCalled();

		const data = await response.json();
		expect(data.guestId).toBe("existing-guest-id");
	});
});
