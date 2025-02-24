import { QuestionListProps } from "@/types/types";
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionListBase from "../QuestionListBase/QuestionListBase";

export default function QuestionList(props: QuestionListProps) {
	return (
		<div className="flex flex-col gap-8" data-testid="question-list">
			<QuestionListBase {...props} CardComponent={QuestionCard} />
		</div>
	);
}
