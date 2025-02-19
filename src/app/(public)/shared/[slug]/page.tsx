import QuestionList from "@/components/QuestionList/QuestionList";
import { notFound } from "next/navigation";

export default async function SharedPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/${slug}`
	);

	if (!response.ok) {
		notFound();
	}

	const data = await response.json();

	return (
		<div>
			<h1 className="text-3xl sm:text-5xl font-bold mb-6">
				Shared Questions
			</h1>
			<QuestionList numberOfQuestions={data.length} questions={data} />
		</div>
	);
}
