import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { categoriesTable } from "./categories";

export const questionsTable = pgTable("questions", {
	id,
	text: text("text").notNull(),
	categoryId: uuid("category_id").references(() => categoriesTable.id, {
		onDelete: "set null",
	}),
	createdAt,
	updatedAt,
});

export const questionsRelations = relations(questionsTable, ({ one }) => ({
	category: one(categoriesTable, {
		fields: [questionsTable.categoryId],
		references: [categoriesTable.id],
	}),
}));
