import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { db } from "../db";
import { questionsTable } from "../schema/questions";
dotenv.config();

async function importQuestions() {
	const filePath = path.join(process.cwd(), "./src/data/questions.json");
	const rawData = fs.readFileSync(filePath, "utf-8");
	const questions = JSON.parse(rawData);

	if (!Array.isArray(questions)) {
		throw new Error("Invalid JSON format: Expected an array.");
	}

	await db.insert(questionsTable).values(
		questions.map((q) => ({
			text: q.text,
			createdAt: new Date(),
			updatedAt: new Date(),
		}))
	);

	console.log(`Successfully imported ${questions.length} questions!`);
	process.exit();
}

importQuestions().catch((err) => {
	console.error("Import failed:", err);
	process.exit(1);
});
