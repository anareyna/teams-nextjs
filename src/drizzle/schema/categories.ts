import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { questionsTable } from "./questions";

export const categoriesTable = pgTable("categories", {
	id,
	name: text("name").notNull().unique(),
	description: text("description"),
	createdAt,
	updatedAt,
});

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
	questions: many(questionsTable),
}));
