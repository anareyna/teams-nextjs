import questions from "../../../data/questions.json";

export async function GET() {
	return new Response(JSON.stringify(questions), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
