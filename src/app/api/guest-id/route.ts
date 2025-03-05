import { getOrCreateGuestId } from "@/lib/guestId";
import { NextResponse } from "next/server";

export async function GET() {
	const guestId = await getOrCreateGuestId();
	return NextResponse.json({ guestId });
}
