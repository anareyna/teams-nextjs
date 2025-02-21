"use server";

export async function generateSharedUrl(
	questionIds: string[]
): Promise<string> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/save`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ questionIds }),
		}
	);

	const data = await response.json();
	return data.slug;
}
