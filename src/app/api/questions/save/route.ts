import { db } from "@/drizzle/db";
import { sharedQuestionsTable } from "@/drizzle/schema";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { questionIds } = await req.json();

	const slug = randomBytes(4).toString("base64url");

	await db.insert(sharedQuestionsTable).values({
		slug,
		questionIds,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	return NextResponse.json({ slug });
}
