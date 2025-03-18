import { DEFAULT_INITIAL_LIST_COUNT } from "@/lib/constants";
import { ListCardGridProps } from "@/types/types";
import QuestionCard from "../QuestionCard/QuestionCard";

export default function ListCardGrid({
	questions,
	isLoading,
}: ListCardGridProps) {
	const items = isLoading
		? Array.from(
				{ length: questions.length || DEFAULT_INITIAL_LIST_COUNT },
				() => ({ id: "", text: "" })
		  )
		: questions;
	return (
		<div className="flex flex-col gap-8" data-testid="list-card-grid">
			{items.map((q, i) => (
				<QuestionCard
					key={q.id || i}
					text={q.text || ""}
					index={i}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
}
