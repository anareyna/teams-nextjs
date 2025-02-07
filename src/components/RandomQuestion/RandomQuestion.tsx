"use client";

import { Question } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import CopyButton from "../CopyButton/CopyButton";
import QuestionList from "../QuestionList/QuestionList";

export default function RandomQuestion({
	questions,
}: {
	questions: Question[];
}) {
	const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(3);
	const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
	const [shareUrl, setShareUrl] = useState("");
	const [isShareUrlVisible, setIsShareUrlVisible] = useState(false);

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

	const handleRestart = () => {
		setNumberDisplayQuestions(3);
		setCurrentQuestions(getRandomQuestions(numberDisplayQuestions));
		setIsShareUrlVisible(false);
	};

	useEffect(() => {
		setCurrentQuestions(getRandomQuestions(numberDisplayQuestions));
	}, [numberDisplayQuestions, getRandomQuestions]);

	return (
		<>
			{isShareUrlVisible ? (
				<>
					<div>
						<h3>
							Your{" "}
							{numberDisplayQuestions > 1
								? "questions are"
								: "question is"}{" "}
							ready!
						</h3>
						<pre>
							<a href={shareUrl} target="_blank">
								{shareUrl}
							</a>
						</pre>
						<CopyButton text={shareUrl} />
					</div>
					<button onClick={handleRestart}>Restart</button>
				</>
			) : (
				<div className="max-w-screen-md">
					<div className="flex gap-4 mb-6">
						{numberDisplayQuestions > 1 ? "Choose from" : "Answer"}
						<button
							onClick={() =>
								setNumberDisplayQuestions((prev) => prev - 1)
							}
							disabled={numberDisplayQuestions === 1}
						>
							-
						</button>
						{numberDisplayQuestions}
						<button
							onClick={() =>
								setNumberDisplayQuestions((prev) => prev + 1)
							}
						>
							+
						</button>
						{numberDisplayQuestions > 1 ? "questions" : "question"}
					</div>
					{numberDisplayQuestions > 0 && (
						<>
							<QuestionList questions={currentQuestions} />

							<div className="flex gap-8">
								<button
									className="mt-12 px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-semibold"
									onClick={() =>
										setCurrentQuestions(
											getRandomQuestions(
												numberDisplayQuestions
											)
										)
									}
								>
									{numberDisplayQuestions > 1
										? "Get New Questions"
										: "Get Another Question"}
								</button>

								<button
									className="mt-12 px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-semibold"
									onClick={() => setIsShareUrlVisible(true)}
								>
									Share this list
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
