import { db } from "@/drizzle/db";
import { questionsTable, sharedQuestionsTable } from "@/drizzle/schema";
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
			})
			.from(sharedQuestionsTable)
			.where(eq(sharedQuestionsTable.slug, slug))
			.limit(1)
			.execute();

		if (!sharedQuestions.length) {
			return NextResponse.json(
				{ error: "No questions found" },
				{ status: 404 }
			);
		}

		const questionIds = sharedQuestions[0].questionIds as string[];

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

		return NextResponse.json(orderedQuestions);
	} catch (error) {
		console.error("Error in GET request:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
