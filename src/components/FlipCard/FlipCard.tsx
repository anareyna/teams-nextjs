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
			className="relative cursor-pointer"
			onClick={() => setIsFlipped(!isFlipped)}
			initial={false}
			animate={{ rotateY: isFlipped ? 180 : 0 }}
			transition={{ duration: 0.6 }}
			style={{ transformStyle: "preserve-3d", display: "inline-block" }}
			role="listitem"
		>
			{/* Front Side */}
			<motion.div
				className="inset-0 backface-hidden"
				style={{ backfaceVisibility: "hidden" }}
			>
				<Card className="absolute w-full flex justify-center p-8 min-h-[150px] sm:min-h-[250px]">
					<CardContent className="sm:text-xl font-semibold flex items-center p-0">
						Question {index + 1}
					</CardContent>
				</Card>
			</motion.div>

			{/* Back Side */}
			<motion.div
				className="inset-0 backface-hidden "
				style={{
					backfaceVisibility: "hidden",
					transform: "rotateY(180deg)",
				}}
			>
				<Card className="flex justify-center items-center p-8 min-h-[150px] sm:min-h-[250px]">
					<CardContent className="text-center sm:text-xl p-0">
						{isLoadingCard ? (
							<Skeleton
								data-testid="question-card-skeleton"
								className="w-full h-[20px] rounded-full"
							/>
						) : (
							<p className="tracking-tight sm:text-xl">{text}</p>
						)}
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
}
