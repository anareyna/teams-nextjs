import { server } from "@/mocks/server";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { beforeAll, describe, expect, it } from "vitest";
import useGuestId from "./useGuestId";

describe("useGuestId hook", () => {
	beforeAll(() => {
		process.env.NEXT_PUBLIC_BASE_URL = "";
	});
	it("should fetch and return the guestId", async () => {
		const { result } = renderHook(() => useGuestId());

		await waitFor(() => {
			expect(result.current).toBe("mocked-uuid");
		});
	});

	it("should handle failed fetch gracefully", async () => {
		server.use(
			http.get("/api/guest-id", async () => {
				return HttpResponse.json(
					{ error: "Failed to fetch guestId" },
					{ status: 500 }
				);
			})
		);

		const { result } = renderHook(() => useGuestId());

		await waitFor(() => {
			expect(result.current).toBeNull();
		});
	});
});
