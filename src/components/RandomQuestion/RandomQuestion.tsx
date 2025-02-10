"use client";

import { Question } from "@/types/types";
import { Share, Shuffle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CopyButton from "../CopyButton/CopyButton";
import QuestionList from "../QuestionList/QuestionList";
import { Button } from "../ui/button";

export default function RandomQuestion({
	questions,
}: {
	questions: Question[];
}) {
	const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(3);
	const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
	const [shareUrl, setShareUrl] = useState("");
	const [isShareUrlVisible, setIsShareUrlVisible] = useState(false);
	const [showShareButton, setShowShareButton] = useState(true);

	const getRandomQuestions = useCallback(
		(count: number): Question[] => {
			const randomized = [...questions].sort(() => Math.random() - 0.5);
			const slicedQuestions = randomized.slice(0, count);

			setShareUrl(
				`${window.location.origin}/shared/${slicedQuestions
					.map((q) => q.id)
					.join("/")}`
			);
			return slicedQuestions;
		},
		[questions]
	);

	const handleShareButton = () => {
		setShowShareButton(false);
		setIsShareUrlVisible(true);
	};

	const handleHideSharedUrl = () => {
		if (isShareUrlVisible) {
			setShowShareButton(true);
			setIsShareUrlVisible(false);
		}
	};

	const handleNewQuestionsButton = () => {
		setCurrentQuestions(getRandomQuestions(numberDisplayQuestions));
		handleHideSharedUrl();
	};

	useEffect(() => {
		setCurrentQuestions(getRandomQuestions(numberDisplayQuestions));
	}, [numberDisplayQuestions, getRandomQuestions]);

	return (
		<>
			<>
				<div className="flex gap-4 mb-6">
					{numberDisplayQuestions > 1 ? "Choose from" : "Answer"}
					<Button
						onClick={() =>
							setNumberDisplayQuestions((prev) => prev - 1)
						}
						disabled={numberDisplayQuestions === 1}
					>
						-
					</Button>
					{numberDisplayQuestions}
					<Button
						onClick={() =>
							setNumberDisplayQuestions((prev) => prev + 1)
						}
					>
						+
					</Button>
					{numberDisplayQuestions > 1 ? "questions" : "question"}
				</div>
				{numberDisplayQuestions > 0 && (
					<>
						<QuestionList questions={currentQuestions} />

						{isShareUrlVisible && (
							<div className="flex flex-col gap-4 p-5 items-center">
								<p className="font-semibold ">
									Your{" "}
									{numberDisplayQuestions > 1
										? "questions are"
										: "question is"}{" "}
									ready!
								</p>
								<div className="flex gap-4">
									<pre className="bg-indigo-100 px-4 py-2 rounded-md select-all break-all">
										<a
											href={shareUrl}
											target="_blank"
											className="text-indigo-700 hover:underline font-semibold text-wrap"
										>
											{shareUrl}
										</a>
									</pre>
									<CopyButton text={shareUrl} />
								</div>
							</div>
						)}

						<div className="flex gap-6 mt-10">
							<Button
								onClick={handleNewQuestionsButton}
								size="lg"
							>
								<Shuffle />
								{numberDisplayQuestions > 1
									? "Get New Questions"
									: "Get Another Question"}
							</Button>

							{showShareButton && (
								<Button
									onClick={handleShareButton}
									variant="secondary"
								>
									<Share />
									Share this list
								</Button>
							)}
						</div>
					</>
				)}
			</>
		</>
	);
}
