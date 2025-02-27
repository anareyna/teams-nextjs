import { jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const sharedQuestionsTable = pgTable("shared_questions", {
	id,
	slug: text("slug").notNull().unique(),
	questionIds: jsonb("question_ids").notNull(),
	mode: text("mode").notNull().default("list"),
	guestId: text("guest_id").notNull(),
	createdAt,
	updatedAt,
});
