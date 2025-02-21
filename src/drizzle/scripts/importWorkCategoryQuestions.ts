import { QUESTION_CATEGORIES } from "@/lib/constants";
import fs from "fs";
import path from "path";
import { db } from "../db";
import { questionsTable } from "../schema/questions";

async function importQuestions() {
	const filePath = path.join(process.cwd(), "./src/data/questions.json");
	const rawData = fs.readFileSync(filePath, "utf-8");
	const questions = JSON.parse(rawData);

	if (!Array.isArray(questions)) {
		throw new Error("Invalid JSON format: Expected an array.");
	}

	// Predefined category ID to be used for all questions
	const categoryId = QUESTION_CATEGORIES.WORK;

	// Insert questions with the predefined categoryId (assuming the category exists)
	await db.insert(questionsTable).values(
		questions.map((q) => ({
			text: q.text,
			categoryId: categoryId,
			createdAt: new Date(),
			updatedAt: new Date(),
		}))
	);

	console.log(
		`Successfully imported ${questions.length} questions with category ID ${categoryId}!`
	);
	process.exit();
}

importQuestions().catch((err) => {
	console.error("Import failed:", err);
	process.exit(1);
});
