"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { QUESTION_CATEGORIES } from "@/lib/constants";
import { getSelectedCategoryData } from "@/lib/helpers";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	const [selectedCategorySlug, setSelectedCategorySlug] = useState<
		string | null
	>(null);

	return (
		<div>
			{selectedCategorySlug && (
				<Button
					onClick={() => setSelectedCategorySlug(null)}
					variant="link"
					className="mb-4"
				>
					<ArrowLeft />
					Back
				</Button>
			)}

			{selectedCategorySlug === null && (
				<div>
					<h1 className="heading-primary">👋 Welcome to IceQ!</h1>
					<p className="text-xl mb-6">
						IceQ helps spark meaningful conversations, whether
						you're with your team, friends, or a close group.
					</p>
					<h2 className="heading-secondary">Choose Your Space:</h2>

					<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,_1fr))] gap-6 my-6">
						{QUESTION_CATEGORIES.map((category) => (
							<Card
								key={category.id}
								className="flex flex-col cursor-pointer"
								onClick={() =>
									setSelectedCategorySlug(category.slug)
								}
							>
								<CardHeader className="flex-grow">
									<CardTitle className="text-xl mb-1">
										{category.title}
									</CardTitle>
									<CardDescription className="text-lg leading-normal">
										{category.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="flex justify-end">
									<Button size="lg">Select</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}

			{selectedCategorySlug && (
				<div>
					<h2 className="heading-secondary">
						{getSelectedCategoryData(selectedCategorySlug)?.title}
					</h2>
					<p className="text-lg">Select a mode:</p>

					<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,_1fr))] gap-6 my-6">
						<Card
							className="flex flex-col cursor-pointer"
							onClick={() => {
								router.push(`/${selectedCategorySlug}/list`);
							}}
						>
							<CardHeader className="flex-grow">
								<CardTitle className="text-xl mb-1">
									🗒 List Mode
								</CardTitle>
								<CardDescription className="text-lg leading-normal">
									Start with 3 questions (adjustable by the
									host). All questions are visible upfront,
									and team members can pick the ones they're
									most comfortable answering.
								</CardDescription>
							</CardHeader>

							<CardContent className="flex justify-end">
								<Button size="lg">Select</Button>
							</CardContent>
						</Card>

						<Card
							className="flex flex-col cursor-pointer hidden"
							onClick={() => {
								router.push(`/${selectedCategorySlug}/mystery`);
							}}
						>
							<CardHeader className="flex-grow">
								<CardTitle className="text-xl mb-1">
									🎲 Mystery mode
								</CardTitle>
								<CardDescription className="text-lg leading-normal">
									Questions stay hidden until revealed by the
									host. Choose how many questions to include
									and uncover them together during the
									session!
								</CardDescription>
							</CardHeader>

							<CardFooter className="flex justify-end">
								<Button size="lg">Select</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
