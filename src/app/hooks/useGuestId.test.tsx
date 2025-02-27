import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGuestId from "./useGuestId";

describe("useGuestId", () => {
	const mockUuid = "test-uuid-12345";
	const storageName = "iceq_guestId";

	beforeEach(() => {
		vi.resetAllMocks();
		localStorage.clear();

		vi.spyOn(Storage.prototype, "getItem");
		vi.spyOn(Storage.prototype, "setItem");

		Object.defineProperty(window, "crypto", {
			value: {
				randomUUID: vi.fn().mockReturnValue(mockUuid),
			},
			configurable: true,
		});
	});

	it("should generate and store a new ID if none exists", () => {
		expect(localStorage.getItem(storageName)).toBeNull();
		const { result } = renderHook(() => useGuestId());
		expect(window.crypto.randomUUID).toHaveBeenCalled();
		expect(localStorage.setItem).toHaveBeenCalledWith(
			storageName,
			mockUuid
		);
		expect(result.current).toBe(mockUuid);
	});

	it("should use existing ID from localStorage", () => {
		const existingId = "existing-guest-id";
		localStorage.setItem(storageName, existingId);
		vi.clearAllMocks();
		const { result } = renderHook(() => useGuestId());
		expect(window.crypto.randomUUID).not.toHaveBeenCalled();
		expect(result.current).toBe(existingId);
	});
});
