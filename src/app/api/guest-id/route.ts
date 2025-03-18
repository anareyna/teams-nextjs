import { getCookie, setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

const generateGuestId = () => {
	return crypto.randomUUID();
};

export async function GET(req: NextRequest) {
	let guestId = await getCookie("guestId", { req });

	if (!guestId) {
		guestId = generateGuestId();
		const res = NextResponse.json({ guestId });
		setCookie("guestId", guestId, { res, req });
		return res;
	}

	return NextResponse.json({ guestId });
}
