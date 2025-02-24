import FlipCardList from "@/components/FlipCardList/FlipCardList";
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

	const { questions, mode } = await response.json();

	return (
		<div>
			<h1 className="heading-primary">You're In! 🎉</h1>
			<p className="text-lg mb-6">
				{mode === "mystery"
					? "These are the selected questions. Pick a number and wait for your host to reveal them one by one."
					: "These are the selected questions. Take a moment to read them and choose any question you'd like to answer."}
			</p>

			{mode === "mystery" ? (
				<FlipCardList
					numberOfQuestions={questions.length}
					questions={questions}
				/>
			) : (
				<QuestionList
					numberOfQuestions={questions.length}
					questions={questions}
				/>
			)}
		</div>
	);
}
