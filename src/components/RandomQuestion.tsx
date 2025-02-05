"use client";

import { useCallback, useEffect, useState } from "react";

export default function RandomQuestion({ questions }: { questions: string[] }) {
	const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(3);
	const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);

	const getRandomQuestions = useCallback(
		(count: number): string[] => {
			const randomized = [...questions].sort(() => Math.random() - 0.5);
			return randomized.slice(0, count);
		},
		[questions]
	);

	useEffect(() => {
		setCurrentQuestions(getRandomQuestions(numberDisplayQuestions));
	}, [numberDisplayQuestions, getRandomQuestions]);

	return (
		<>
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
						<ul className="flex flex-col gap-10">
							{currentQuestions.map((question, index) => (
								<li
									key={index}
									className="text-3xl border-l-8 border-blue-500 pl-8 py-3 rounded font-semibold"
								>
									{question}
								</li>
							))}
						</ul>

						<button
							className="mt-12 px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-semibold"
							onClick={() =>
								setCurrentQuestions(
									getRandomQuestions(numberDisplayQuestions)
								)
							}
						>
							{numberDisplayQuestions > 1
								? "Get New Questions"
								: "Get Another Question"}
						</button>
					</>
				)}
			</div>
		</>
	);
}
