"use client";

import { DEFAULT_INITIAL_MYSTERY_COUNT } from "@/lib/constants";
import { pusherClient } from "@/lib/pusher";
import { FlipCardGridSharedProps } from "@/types/types";
import { useEffect, useState } from "react";
import FlipCard from "../FlipCard/FlipCard";

export default function FlipCardGridShared({
	isLoading: initialLoading,
	questions,
	viewer,
	slug,
	initialFlippedCards = [],
}: FlipCardGridSharedProps) {
	const [flippedCards, setFlippedCards] =
		useState<number[]>(initialFlippedCards);
	const [loadingCards, setLoadingCards] = useState<number[]>([]);

	useEffect(() => {
		if (!slug) return;

		const channel = pusherClient.subscribe(`shared-questions-${slug}`);

		channel.bind(
			"card-flipped",
			(data: {
				flippedCards: number[];
				cardIndex: number;
				isFlipped: boolean;
			}) => {
				setFlippedCards(data.flippedCards);
				setLoadingCards((current) =>
					current.filter((idx) => idx !== data.cardIndex)
				);
			}
		);

		return () => {
			pusherClient.unsubscribe(`shared-questions-${slug}`);
		};
	}, [slug]);

	const handleCardFlip = async (index: number) => {
		if (viewer === "guest") return;

		setLoadingCards((current) => [...current, index]);

		try {
			const response = await fetch(`/api/questions/${slug}/flip`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cardIndex: index }),
			});

			if (!response.ok) {
				const error = await response.json();
				console.error("Error flipping card:", error);
			}
		} catch (error) {
			console.error("Error flipping card:", error);
		} finally {
			setLoadingCards((current) =>
				current.filter((idx) => idx !== index)
			);
		}
	};

	const items = initialLoading
		? Array.from(
				{ length: questions?.length || DEFAULT_INITIAL_MYSTERY_COUNT },
				() => ({ id: null, text: null })
		  )
		: questions;

	return (
		<div
			className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
			data-testid="flip-card-grid"
		>
			{items.map((q, i) => (
				<FlipCard
					key={q.id || i}
					text={q.text || ""}
					index={i}
					isLoading={initialLoading || loadingCards.includes(i)}
					isFlipped={flippedCards.includes(i)}
					onClick={() => handleCardFlip(i)}
					viewer={viewer}
				/>
			))}
		</div>
	);
}
