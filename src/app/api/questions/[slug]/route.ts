import { db } from "@/drizzle/db";
import { questionsTable, sharedQuestionsTable } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

type QuestionId = typeof questionsTable.id.dataType;

export async function GET(
	req: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		const { slug } = params;

		const sharedQuestions = await db
			.select({
				questionIds: sharedQuestionsTable.questionIds,
			})
			.from(sharedQuestionsTable)
			.where(eq(sharedQuestionsTable.slug, slug))
			.limit(1)
			.execute();

		const data = sharedQuestions[0];

		if (!data) {
			return NextResponse.json(
				{ error: "No questions found" },
				{ status: 404 }
			);
		}

		const questionIds = data.questionIds as QuestionId[];

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
