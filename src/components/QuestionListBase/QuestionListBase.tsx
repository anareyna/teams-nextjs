import { CardProps, QuestionListProps } from "@/types/types";

type QuestionListBaseProps = QuestionListProps & {
	CardComponent: React.ComponentType<CardProps>;
};

export default function QuestionListBase({
	numberOfQuestions,
	questions,
	isLoading,
	CardComponent,
}: QuestionListBaseProps) {
	const items = isLoading
		? Array.from({ length: numberOfQuestions }, () => null)
		: questions;

	return (
		<>
			{items.map((q, i) => (
				<CardComponent
					key={q?.id || i}
					text={q?.text || ""}
					index={i}
					isLoadingCard={isLoading}
				/>
			))}
		</>
	);
}
