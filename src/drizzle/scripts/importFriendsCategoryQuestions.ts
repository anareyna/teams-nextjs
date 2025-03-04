import { QUESTION_CATEGORIES } from "@/lib/constants";
import fs from "fs";
import path from "path";
import { db } from "../db";
import { questionsTable } from "../schema/questions";

async function importFriendsQuestions() {
	const filePath = path.join(
		process.cwd(),
		"./src/data/friends-questions.local.json"
	);
	const rawData = fs.readFileSync(filePath, "utf-8");
	const questions = JSON.parse(rawData);

	if (!Array.isArray(questions)) {
		throw new Error("Invalid JSON format: Expected an array.");
	}

	// Ensure there's a valid category for Friends
	const categoryId = QUESTION_CATEGORIES[1].id;

	if (!categoryId) {
		throw new Error("Category ID for Friends questions is missing!");
	}

	await db.insert(questionsTable).values(
		questions.map((text) => ({
			text,
			categoryId,
			createdAt: new Date(),
			updatedAt: new Date(),
		}))
	);

	console.log(`Successfully imported ${questions.length} Friends questions!`);
	process.exit();
}

importFriendsQuestions().catch((err) => {
	console.error("Import failed:", err);
	process.exit(1);
});
