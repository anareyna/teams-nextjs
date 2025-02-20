import { db } from "@/drizzle/db";
import { sharedQuestionsTable } from "@/drizzle/schema";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { questionIds } = await req.json();

		if (
			!questionIds ||
			!Array.isArray(questionIds) ||
			questionIds.length === 0
		) {
			return NextResponse.json(
				{ error: "questionIds must be a non-empty array" },
				{ status: 400 }
			);
		}

		const slug = randomBytes(3).toString("hex");

		await db.insert(sharedQuestionsTable).values({
			slug,
			questionIds,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json({ slug });
	} catch (error) {
		return NextResponse.json(
			{ error: `Internal server error: ${error}` },
			{ status: 500 }
		);
	}
}
