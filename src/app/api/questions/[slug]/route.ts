import { db } from "@/drizzle/db";
import { questionsTable, sharedQuestionsTable } from "@/drizzle/schema";
import { QuestionMode } from "@/types/types";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;

		const sharedQuestions = await db
			.select({
				questionIds: sharedQuestionsTable.questionIds,
				mode: sharedQuestionsTable.mode,
			})
			.from(sharedQuestionsTable)
			.where(eq(sharedQuestionsTable.slug, slug))
			.limit(1)
			.execute();

		if (!sharedQuestions.length) {
			return NextResponse.json(
				{ error: "No questions found", questions: [], mode: null },
				{ status: 404 }
			);
		}

		const { questionIds, mode } = sharedQuestions[0] as {
			questionIds: string[];
			mode: QuestionMode;
		};

		const questions = await db
			.select({
				id: questionsTable.id,
				text: questionsTable.text,
			})
			.from(questionsTable)
			.where(inArray(questionsTable.id, questionIds))
			.execute();

		const orderedQuestions = questionIds
			.map((id) => questions.find((q) => q.id === id))
			.filter(Boolean);

		return NextResponse.json({
			questions: orderedQuestions,
			mode,
		});
	} catch (error) {
		console.error("Error in GET request:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
