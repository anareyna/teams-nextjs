"use server";

import { QuestionMode } from "@/types/types";

export async function generateSharedUrl(
	questionIds: string[],
	mode: QuestionMode,
	guestId: string
): Promise<string> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/save`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ questionIds, mode, guestId }),
		}
	);

	const data = await response.json();
	return data.slug;
}
