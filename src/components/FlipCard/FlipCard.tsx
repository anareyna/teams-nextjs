"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CardProps } from "@/types/types";
import { motion } from "motion/react";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function FlipCard({ text, index, isLoadingCard }: CardProps) {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<motion.div
			className="relative w-64 h-52 cursor-pointer"
			onClick={() => setIsFlipped(!isFlipped)}
			initial={false}
			animate={{ rotateY: isFlipped ? 180 : 0 }}
			transition={{ duration: 0.6 }}
			style={{ transformStyle: "preserve-3d" }}
			role="listitem"
		>
			{/* Front Side */}
			<motion.div
				className="absolute w-full h-full backface-hidden"
				style={{ backfaceVisibility: "hidden" }}
			>
				<Card className="flex justify-center items-center h-full">
					<CardContent className="text-center p-6 text-xl font-semibold">
						Question {index + 1}
					</CardContent>
				</Card>
			</motion.div>

			{/* Back Side */}
			<motion.div
				className="absolute w-full h-full backface-hidden"
				style={{
					backfaceVisibility: "hidden",
					transform: "rotateY(180deg)",
				}}
			>
				<Card className="flex justify-center items-center h-full bg-gray-800 text-white">
					<CardContent className="text-center p-6 text-xl font-semibold">
						{isLoadingCard ? (
							<Skeleton
								data-testid="question-card-skeleton"
								className="w-full h-[20px] rounded-full"
							/>
						) : (
							<p className="font-semibold tracking-tight text-xl">
								{text}
							</p>
						)}
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
}
