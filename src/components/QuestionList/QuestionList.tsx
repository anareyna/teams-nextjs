import { Question } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function QuestionList({ questions }: { questions: Question[] }) {
	return (
		<div className="flex flex-col gap-8">
			{questions.map((q, i) => (
				<Card key={q.id} role="listitem">
					<CardHeader className="pb-2">
						<CardTitle className="uppercase text-gray-400 font-bold">
							Question {i + 1}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="font-semibold tracking-tight text-xl sm:text-2xl">
							{q.question}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
