"use client";

import { Button } from "@/components/ui/button";
import { Question, QuestionsClientProps } from "@/types/types";
import { Loader2, Share, Shuffle } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

import useGuestId from "@/app/hooks/useGuestId";
import ListCardGrid from "@/components/ListCardGrid/ListCardGrid";
import QuestionControls from "@/components/QuestionControls/QuestionControls";
import { generateSharedUrl } from "@/lib/actions";
import {
	DEFAULT_INITIAL_LIST_COUNT,
	DEFAULT_INITIAL_MYSTERY_COUNT,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import FlipCardGrid from "../FlipCardGrid/FlipCardGrid";

export default function QuestionsClient({
	mode,
	categoryId,
}: QuestionsClientProps) {
	const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(
		mode === "mystery"
			? DEFAULT_INITIAL_MYSTERY_COUNT
			: DEFAULT_INITIAL_LIST_COUNT
	);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isFetchingLoading, setIsFetchingLoading] = useState(true);
	const [isShareLoading, setIsShareLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	const guestId = useGuestId();
	const router = useRouter();

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
	};

	const handleShareButtonClick = async () => {
		console.log("click");
		setIsShareLoading(true);
		const questionIds = questions.map((q) => q.id);
		const slug = await generateSharedUrl(questionIds, mode, guestId ?? "");
		const newShareUrl = `${window.location.origin}/shared/${slug}`;

		startTransition(() => {
			router.push(newShareUrl);
		});
	};

	const handleIncreaseQuestionsClick = () => {
		setNumberDisplayQuestions((prev) => prev + 1);
	};

	const handleDecreaseQuestionsClick = () => {
		setNumberDisplayQuestions((prev) => (prev > 1 ? prev - 1 : 1));
	};

	return (
		<div>
			<div className="flex justify-between gap-4 flex-wrap mb-6">
				<QuestionControls
					numberOfQuestions={numberDisplayQuestions}
					onIncrease={handleIncreaseQuestionsClick}
					onDecrease={handleDecreaseQuestionsClick}
				/>
				<div className="flex gap-4">
					<Button
						onClick={handleNewQuestionsButtonClick}
						size="lg"
						disabled={isFetchingLoading}
					>
						{isFetchingLoading ? (
							<Loader2 className="animate-spin" />
						) : (
							<Shuffle />
						)}
						{numberDisplayQuestions > 1
							? "New Questions"
							: "Another Question"}
					</Button>

					<Button
						onClick={handleShareButtonClick}
						variant="secondary"
						size="lg"
						disabled={isFetchingLoading || isShareLoading}
					>
						{isShareLoading || isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							<Share />
						)}
						Share this list
					</Button>
				</div>
			</div>

			{mode === "mystery" ? (
				<FlipCardGrid
					questions={questions}
					isLoading={isFetchingLoading}
				/>
			) : (
				<ListCardGrid
					questions={questions}
					isLoading={isFetchingLoading}
				/>
			)}
		</div>
	);
}
