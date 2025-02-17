import { Question } from "@/types/types";
import QuestionCard from "../QuestionCard/QuestionCard";

type QuestionListProps = {
	numberOfQuestions: number;
	questions: Question[];
	isLoading?: boolean;
};

export default function QuestionList({
	numberOfQuestions,
	questions,
	isLoading,
}: QuestionListProps) {
	return (
		<div className="flex flex-col gap-8">
			{isLoading
				? Array.from({ length: numberOfQuestions }).map((_, i) => (
						<QuestionCard
							key={i}
							text={""}
							index={i}
							isLoadingCard={true}
						/>
				  ))
				: questions.map((q, i) => (
						<QuestionCard key={i} text={q.text} index={i} />
				  ))}
		</div>
	);
}
