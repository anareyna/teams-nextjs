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
	const items = isLoading
		? Array.from({ length: numberOfQuestions }, () => null)
		: questions;
	return (
		<div className="flex flex-col gap-8">
			{items.map((q, i) => (
				<QuestionCard
					key={q?.id || i}
					text={q?.text || ""}
					index={i}
					isLoadingCard={isLoading}
				/>
			))}
		</div>
	);
}
