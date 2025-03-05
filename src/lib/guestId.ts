import { cookies } from "next/headers";

export async function getOrCreateGuestId() {
	let guestId = (await cookies()).get("guestId")?.value;

	if (!guestId) {
		guestId = crypto.randomUUID();
		(await cookies()).set("guestId", guestId, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 30, // 30 days
		});
	}
	return guestId;
}
