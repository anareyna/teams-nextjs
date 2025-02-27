"use client";

import QuestionList from "@/components/QuestionList/QuestionList";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/types";
import { Share, Shuffle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import useGuestId from "@/app/hooks/useGuestId";
import QuestionControls from "@/components/QuestionControls/QuestionControls";
import SharedBlock from "@/components/SharedBlock/SharedBlock";
import { generateSharedUrl } from "@/lib/actions";
import { DEFAULT_QUESTION_COUNT } from "@/lib/constants";
import FlipCardList from "../FlipCardList/FlipCardList";

export default function QuestionListClient({
	initialQuestionCount = DEFAULT_QUESTION_COUNT,
	categoryId,
	useFlipCards,
}: {
	initialQuestionCount?: number;
	categoryId: string;
	useFlipCards?: boolean;
}) {
	const [numberDisplayQuestions, setNumberDisplayQuestions] =
		useState(initialQuestionCount);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isFetchingLoading, setIsFetchingLoading] = useState(true);
	const [isShareLoading, setIsShareLoading] = useState(false);
	const [shareUrl, setShareUrl] = useState("");
	const [showShareButton, setShowShareButton] = useState(true);
	const [isSharedUrlVisible, setIsSharedUrlVisible] = useState(false);
	const guestId = useGuestId();

	const fetchQuestions = useCallback(async () => {
		setIsFetchingLoading(true);
		try {
			const response = await fetch(
				`/api/questions?count=${numberDisplayQuestions}&categoryId=${categoryId}`
			);
			const newQuestions = await response.json();
			setQuestions(newQuestions);
		} catch (error) {
			console.error("Error fetching questions:", error);
		} finally {
			setIsFetchingLoading(false);
		}
	}, [numberDisplayQuestions, categoryId]);

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
		const mode = useFlipCards ? "mystery" : "list";
		const slug = await generateSharedUrl(questionIds, mode, guestId ?? "");
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

			{useFlipCards ? (
				<FlipCardList
					numberOfQuestions={numberDisplayQuestions}
					questions={questions}
					isLoading={isFetchingLoading}
				/>
			) : (
				<QuestionList
					numberOfQuestions={numberDisplayQuestions}
					questions={questions}
					isLoading={isFetchingLoading}
				/>
			)}

			{isSharedUrlVisible && (
				<SharedBlock
					isLoading={isShareLoading}
					numberOfQuestions={numberDisplayQuestions}
					shareUrl={shareUrl}
				/>
			)}

			<div className="flex justify-center gap-6 mt-10">
				<Button
					onClick={handleNewQuestionsButtonClick}
					size="lg"
					disabled={isFetchingLoading}
				>
					<Shuffle />
					{numberDisplayQuestions > 1
						? "New Questions"
						: "Another Question"}
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
