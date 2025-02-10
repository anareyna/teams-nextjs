import { Question } from "@/types/types";

export default function QuestionList({ questions }: { questions: Question[] }) {
	return (
		<ul className="flex flex-col gap-8">
			{questions.map((q, i) => (
				<li
					key={q.id}
					className="px-6 py-4 sm:px-10 sm:py-8 rounded bg-white shadow-sm"
				>
					<p className="uppercase text-sm sm:text-base tracking-wide text-gray-400 font-bold">
						Question {i + 1}
					</p>
					<p className="font-semibold text-gray-600 tracking-tight text-xl sm:text-2xl">
						{q.question}
					</p>
				</li>
			))}
		</ul>
	);
}
