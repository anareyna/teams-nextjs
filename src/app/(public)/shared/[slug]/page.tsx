import QuestionList from "@/components/QuestionList/QuestionList";
import { notFound } from "next/navigation";

export default async function SharedPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;

	const response = await fetch(`http://localhost:3000/api/questions/${slug}`);

	if (!response.ok) {
		notFound();
	}

	const data = await response.json();

	return (
		<div>
			<h1 className="text-3xl sm:text-5xl font-bold mb-6">
				Shared Questions
			</h1>
			<QuestionList questions={data} />
		</div>
	);
}
