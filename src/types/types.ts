import { QUESTION_MODES } from "@/lib/constants";

export type Question = {
	id: string;
	text: string;
};

export type CardProps = {
	text: string;
	index: number;
	isLoadingCard?: boolean;
};

export type QuestionListProps = {
	title?: string;
	numberOfQuestions: number;
	questions: Question[];
	isLoading?: boolean;
};

export type QuestionMode = (typeof QUESTION_MODES)[number];
