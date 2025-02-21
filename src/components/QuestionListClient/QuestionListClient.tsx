"use client";

import QuestionList from "@/components/QuestionList/QuestionList";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/types";
import { Share, Shuffle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import QuestionControls from "@/components/QuestionControls/QuestionControls";
import SharedBlock from "@/components/SharedBlock/SharedBlock";
import { generateSharedUrl } from "@/lib/actions";
import { DEFAULT_QUESTION_COUNT } from "@/lib/constants";

export default function QuestionListClient({
	initialQuestionCount = DEFAULT_QUESTION_COUNT,
}: {
	initialQuestionCount?: number;
}) {
	const [numberDisplayQuestions, setNumberDisplayQuestions] =
		useState(initialQuestionCount);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isFetchingLoading, setIsFetchingLoading] = useState(true);
	const [isShareLoading, setIsShareLoading] = useState(false);
	const [shareUrl, setShareUrl] = useState("");
	const [showShareButton, setShowShareButton] = useState(true);
	const [isSharedUrlVisible, setIsSharedUrlVisible] = useState(false);

	const fetchQuestions = useCallback(async () => {
		setIsFetchingLoading(true);
		try {
			const response = await fetch(
				`/api/questions?count=${numberDisplayQuestions}`
			);
			const newQuestions = await response.json();
			setQuestions(newQuestions);
		} catch (error) {
			console.error("Error fetching questions:", error);
		} finally {
			setIsFetchingLoading(false);
		}
	}, [numberDisplayQuestions]);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	const handleNewQuestionsButtonClick = () => {
		fetchQuestions();
		resetShareState();
	};

	const handleShareButtonClick = async () => {
		setIsShareLoading(true);
		const questionIds = questions.map((q) => q.id);
		const slug = await generateSharedUrl(questionIds);
		setShareUrl(`${window.location.origin}/shared/${slug}`);
		setShowShareButton(false);
		setIsSharedUrlVisible(true);
		setIsShareLoading(false);
	};

	const resetShareState = () => {
		if (isSharedUrlVisible) {
			setShowShareButton(true);
			setIsSharedUrlVisible(false);
		}
	};

	const handleIncreaseQuestionsClick = () => {
		setNumberDisplayQuestions((prev) => prev + 1);
		resetShareState();
	};

	const handleDecreaseQuestionsClick = () => {
		setNumberDisplayQuestions((prev) => (prev > 1 ? prev - 1 : 1));
		resetShareState();
	};

	return (
		<div>
			<QuestionControls
				className="mb-6"
				numberOfQuestions={numberDisplayQuestions}
				onIncrease={handleIncreaseQuestionsClick}
				onDecrease={handleDecreaseQuestionsClick}
			/>

			<QuestionList
				numberOfQuestions={numberDisplayQuestions}
				questions={questions}
				isLoading={isFetchingLoading}
			/>

			{isSharedUrlVisible && (
				<SharedBlock
					isLoading={isShareLoading}
					numberOfQuestions={numberDisplayQuestions}
					shareUrl={shareUrl}
				/>
			)}

			<div className="flex justify-center gap-6 mt-10">
				<Button onClick={handleNewQuestionsButtonClick} size="lg">
					<Shuffle />
					{numberDisplayQuestions > 1
						? "Get New Questions"
						: "Get Another Question"}
				</Button>

				{showShareButton && (
					<Button
						onClick={handleShareButtonClick}
						variant="secondary"
						size="lg"
					>
						<Share />
						Share this list
					</Button>
				)}
			</div>
		</div>
	);
}
