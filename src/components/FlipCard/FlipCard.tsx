"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CardProps } from "@/types/types";
import { Loader2, MessageCircleQuestion } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function FlipCard({ text, index, isLoading }: CardProps) {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<motion.div
			className={`relative cursor-pointer ${
				isLoading ? "pointer-events-none" : ""
			}`}
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
				<Card className="absolute w-full flex justify-center p-8 min-h-[150px] sm:min-h-[250px] bg-primary dark:bg-card text-card dark:text-card-foreground">
					<CardContent className="sm:text-xl font-semibold flex flex-col justify-center items-center p-0">
						{isLoading ? (
							<Loader2 className="animate-spin h-12 w-12 opacity-80" />
						) : (
							<>
								<MessageCircleQuestion className="h-12 w-12 mb-2" />
								Question {index + 1}
							</>
						)}
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
				<Card className="flex justify-center items-center p-8 min-h-[150px] sm:min-h-[250px] dark:bg-card-foreground dark:text-primary">
					<CardContent className="text-center sm:text-xl p-0">
						<p className="tracking-tight sm:text-xl font-semibold">
							{text}
						</p>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
}
