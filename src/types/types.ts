import { QUESTION_MODES } from "@/lib/constants";

export type Question = {
	id: string;
	text: string;
};

export type QuestionMode = (typeof QUESTION_MODES)[number];

export type QuestionsClientProps = {
	categoryId: string;
	mode: QuestionMode;
};

export type CardProps = {
	text: string;
	index: number;
	isLoading?: boolean;
};

export type ListCardGridProps = {
	questions: Question[];
	isLoading?: boolean;
};

export type FlipCardGridProps = {
	isLoading?: boolean;
	questions: Question[];
};

type ViewerType = "host" | "guest";

export type FlipCardGridSharedProps = FlipCardGridProps & {
	viewer?: ViewerType;
	slug?: string;
	initialFlippedCards?: number[];
};

export type FlipCardProps = {
	text: string;
	index: number;
	isLoading?: boolean;
	isFlipped?: boolean;
	onClick?: () => void;
	className?: string;
	viewer?: ViewerType;
};
