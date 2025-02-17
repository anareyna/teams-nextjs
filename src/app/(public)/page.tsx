"use client";
import CopyButton from "@/components/CopyButton/CopyButton";
import QuestionControls from "@/components/QuestionControls/QuestionControls";
import QuestionList from "@/components/QuestionList/QuestionList";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/types";
import { Share, Shuffle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
	const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(3);
	const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
	const [showShareButton, setShowShareButton] = useState(true);
	const [isSharedUrlVisible, setIsSharedUrlVisible] = useState(false);
	const [shareUrl, setShareUrl] = useState("");

	const fetchQuestions = useCallback(async () => {
		try {
			const response = await fetch(
				`/api/questions?count=${numberDisplayQuestions}`
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "An error occurred");
			}

			console.log(data.map((q: Question) => q.text));

			setRandomQuestions(data);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	}, [numberDisplayQuestions]);

	const generateSharedUrl = async () => {
		const questionIds = randomQuestions.map((q) => q.id);
		await fetch(`/api/questions/save?questionIds=${questionIds}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				questionIds,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setShareUrl(`${window.location.origin}/shared/${data.slug}`);
			});
	};

	const handleNewQuestionsButtonClick = () => {
		fetchQuestions();
		chackSharedUrlBlock();
	};

	const handleShareButtonClick = () => {
		setShowShareButton(false);
		generateSharedUrl();
		setIsSharedUrlVisible(true);
	};

	const chackSharedUrlBlock = () => {
		if (isSharedUrlVisible) {
			setShowShareButton(true);
			setIsSharedUrlVisible(false);
		}
	};

	const handleDecreaseQuestionsClick = () => {
		setNumberDisplayQuestions((prev) => (prev > 1 ? prev - 1 : 1));
		chackSharedUrlBlock();
	};

	const handleIncreaseQuestionsClick = () => {
		setNumberDisplayQuestions((prev) => prev + 1);
		chackSharedUrlBlock();
	};

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions, numberDisplayQuestions]);

	return (
		<div>
			<h1 className="text-3xl sm:text-5xl font-bold mb-6">Questions</h1>

			<QuestionControls
				className="mb-6"
				numberOfQuestions={numberDisplayQuestions}
				onIncrease={handleIncreaseQuestionsClick}
				onDecrease={handleDecreaseQuestionsClick}
			/>

			<QuestionList questions={randomQuestions} />
			{isSharedUrlVisible && (
				<div className="flex flex-col gap-4 p-5 items-center">
					<p className="font-semibold ">
						Your{" "}
						{numberDisplayQuestions > 1
							? "questions are"
							: "question is"}{" "}
						ready!
					</p>
					<div className="flex items-center gap-4">
						<pre className="bg-indigo-100 px-4 py-2 rounded-md select-all break-all">
							<a
								href={shareUrl}
								className="text-indigo-700 hover:underline font-semibold text-wrap"
							>
								{shareUrl}
							</a>
						</pre>
						<CopyButton text={shareUrl} />
					</div>
				</div>
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
