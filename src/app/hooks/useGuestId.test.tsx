import { renderHook, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import useGuestId from "./useGuestId";

describe("useGuestId", () => {
	beforeAll(() => {
		process.env.NEXT_PUBLIC_BASE_URL = "";
	});
	it("should fetch and set guestId", async () => {
		const { result } = renderHook(() => useGuestId());

		await waitFor(() => expect(result.current).toBe("mocked-guest-id"));
	});
});
