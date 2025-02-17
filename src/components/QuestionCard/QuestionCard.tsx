import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type QuestionCardProps = {
	text: string;
	index: number;
	isLoadingCard?: boolean;
};

export default function QuestionCard({
	text,
	index,
	isLoadingCard,
}: QuestionCardProps) {
	return (
		<Card role="listitem" data-testId={`question-card-${index}`}>
			<CardHeader className="pb-2">
				<CardTitle className="uppercase text-gray-400 font-bold">
					Question {index + 1}
				</CardTitle>
			</CardHeader>
			<CardContent className={isLoadingCard ? "space-y-3" : ""}>
				{isLoadingCard ? (
					<>
						<Skeleton
							data-testId="question-card-skeleton"
							className="w-full h-[20px] rounded-full"
						/>
						<Skeleton className="w-1/2 h-[20px] rounded-full" />
					</>
				) : (
					<p className="font-semibold tracking-tight text-xl sm:text-2xl">
						{text}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
