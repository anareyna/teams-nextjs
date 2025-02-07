import { Question } from "@/types/types";

export default function QuestionList({ questions }: { questions: Question[] }) {
	return (
		<ul className="flex flex-col gap-10">
			{questions.map((q) => (
				<li
					key={q.id}
					className="text-3xl border-l-8 border-blue-500 pl-8 py-3 rounded font-semibold"
				>
					{q.question}
				</li>
			))}
		</ul>
	);
}
