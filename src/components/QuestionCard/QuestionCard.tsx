import { CardProps } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function QuestionCard({
	text,
	index,
	isLoadingCard,
}: CardProps) {
	return (
		<Card role="listitem" data-testid={`question-card-${index}`}>
			<CardHeader className="pb-2">
				<CardTitle className="uppercase text-gray-400 font-bold text-sm sm:text-base">
					Question {index + 1}
				</CardTitle>
			</CardHeader>
			<CardContent className={isLoadingCard ? "space-y-3" : ""}>
				{isLoadingCard ? (
					<>
						<Skeleton
							data-testid="question-card-skeleton"
							className="w-full h-[20px] rounded-full"
						/>
						<Skeleton className="w-1/2 h-[20px] rounded-full" />
					</>
				) : (
					<p className="font-semibold sm:text-xl">{text}</p>
				)}
			</CardContent>
		</Card>
	);
}
