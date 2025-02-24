import { Question } from "@/types/types";
import QuestionCard from "../QuestionCard/QuestionCard";

type QuestionListProps = {
	title?: string;
	numberOfQuestions: number;
	questions: Question[];
	isLoading?: boolean;
};

export default function QuestionList({
	title,
	numberOfQuestions,
	questions,
	isLoading,
}: QuestionListProps) {
	const items = isLoading
		? Array.from({ length: numberOfQuestions }, () => null)
		: questions;
	return (
		<>
			{title && <h2>{title}</h2>}
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
		</>
	);
}
