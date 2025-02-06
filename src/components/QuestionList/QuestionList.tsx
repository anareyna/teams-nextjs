export default function QuestionList({ questions }: { questions: string[] }) {
	return (
		<ul className="flex flex-col gap-10">
			{questions.map((q, index) => (
				<li
					key={index}
					className="text-3xl border-l-8 border-blue-500 pl-8 py-3 rounded font-semibold"
				>
					{q}
				</li>
			))}
		</ul>
	);
}
