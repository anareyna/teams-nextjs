import { db } from "@/drizzle/db";
import { questionsTable } from "@/drizzle/schema";
import { DEFAULT_INITIAL_LIST_COUNT } from "@/lib/constants";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const count = parseInt(
			searchParams.get("count") || DEFAULT_INITIAL_LIST_COUNT.toString()
		);
		const categoryId = searchParams.get("categoryId");

		if (isNaN(count) || count < 1) {
			return NextResponse.json(
				{
					error: "Invalid count parameter. Must be a positive number.",
				},
				{ status: 400 }
			);
		}

		const questions = await db
			.select({
				id: questionsTable.id,
				text: questionsTable.text,
			})
			.from(questionsTable)
			.where(
				categoryId
					? eq(questionsTable.categoryId, categoryId)
					: undefined
			)
			.orderBy(sql`RANDOM()`)
			.limit(count)
			.execute();

		if (questions.length === 0) {
			return NextResponse.json(
				{ error: "No questions found for the selected category" },
				{ status: 404 }
			);
		}

		return NextResponse.json(questions);
	} catch (error) {
		console.error("Error getting questions:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
