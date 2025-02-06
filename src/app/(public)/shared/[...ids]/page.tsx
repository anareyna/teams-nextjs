import QuestionList from "@/components/QuestionList/QuestionList";
import { notFound } from "next/navigation";
import questions from "../../../../data/questions.json";

export default async function Page({ params }: { params: { ids: string[] } }) {
	const { ids } = await params;
	const numericIds = ids.map((id) => parseInt(id, 10));

	const filteredQuestions = numericIds
		.map((id) => questions[id])
		.filter((question) => question);

	if (filteredQuestions.length === 0) {
		return notFound();
	}

	return (
		<div>
			<h1 className="text-5xl font-bold mb-6">Shared Questions</h1>

			<QuestionList questions={filteredQuestions} />
		</div>
	);
}
