import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

export async function getGuestId() {
	try {
		const guestId = await getCookie("guestId", { cookies });
		return guestId ?? null;
	} catch {
		return null;
	}
}
