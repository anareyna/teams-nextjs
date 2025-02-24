import { QuestionListProps } from "@/types/types";
import FlipCard from "../FlipCard/FlipCard";
import QuestionListBase from "../QuestionListBase/QuestionListBase";

export default function FlipCardList(props: QuestionListProps) {
	return (
		<div
			className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
			data-testid="flip-card-list"
		>
			<QuestionListBase {...props} CardComponent={FlipCard} />
		</div>
	);
}
