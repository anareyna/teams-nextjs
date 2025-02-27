import { db } from "@/drizzle/db";
import { sharedQuestionsTable } from "@/drizzle/schema";
import { QUESTION_MODES } from "@/lib/constants";
import { QuestionMode } from "@/types/types";
import { randomBytes } from "crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { questionIds, mode, guestId } = await req.json();

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

		if (!QUESTION_MODES.includes(mode as QuestionMode)) {
			return NextResponse.json(
				{
					error: `Invalid mode. Must be one of: ${QUESTION_MODES.join(
						", "
					)}`,
				},
				{ status: 400 }
			);
		}

		if (!guestId) {
			return NextResponse.json(
				{ error: "guestId is required" },
				{ status: 400 }
			);
		}

		const existingSlug = await db.query.sharedQuestionsTable.findFirst({
			where: and(
				eq(sharedQuestionsTable.guestId, guestId),
				eq(sharedQuestionsTable.mode, mode),
				eq(sharedQuestionsTable.questionIds, questionIds)
			),
		});

		if (existingSlug) {
			return NextResponse.json({ slug: existingSlug.slug });
		}

		const slug = randomBytes(3).toString("hex");

		await db.insert(sharedQuestionsTable).values({
			slug,
			questionIds,
			mode,
			guestId,
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
