import { DEFAULT_INITIAL_MYSTERY_COUNT } from "@/lib/constants";
import { FlipCardGridProps } from "@/types/types";
import FlipCard from "../FlipCard/FlipCard";

export default function FlipCardGrid({
	isLoading,
	questions,
}: FlipCardGridProps) {
	const items = isLoading
		? Array.from(
				{ length: questions.length || DEFAULT_INITIAL_MYSTERY_COUNT },
				() => ({ id: null, text: null })
		  )
		: questions;
	return (
		<div
			className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
			data-testid="flip-card-grid"
		>
			{items.map((q, i) => (
				<FlipCard
					key={q.id || i}
					text={q.text || ""}
					index={i}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
}
