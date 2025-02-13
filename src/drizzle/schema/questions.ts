import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const questionsTable = pgTable("questions", {
	id,
	text: text("text").notNull(),
	createdAt,
	updatedAt,
});
