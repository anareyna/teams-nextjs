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
	questions: Question[];
	isLoading?: boolean;
};
