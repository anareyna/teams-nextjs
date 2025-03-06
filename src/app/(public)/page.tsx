"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
					<p className="sm:text-xl mb-6">
						IceQ helps spark meaningful conversations, whether
						you're with your team, friends, or a close group.
					</p>
					<h2 className="heading-secondary mt-5 sm:mt-10">
						Choose Your Space:
					</h2>

					<div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-10 my-6">
						{QUESTION_CATEGORIES.map((category) => (
							<Card
								key={category.id}
								className="flex flex-col cursor-pointer hover:scale-[1.05] transition-all"
								onClick={() =>
									setSelectedCategorySlug(category.slug)
								}
							>
								<CardHeader className="pb-4">
									<CardTitle className="sm:text-xl">
										{category.title}
									</CardTitle>
								</CardHeader>
								<div
									className="overflow-hidden w-full h-40"
									style={{
										backgroundImage: `url(${category.image})`,
										backgroundSize: "cover",
										backgroundPosition: "top",
									}}
								></div>
								<CardContent className="pt-4">
									<p className="sm:text-lg">
										{category.description}
									</p>
									<div className="flex justify-end mt-6">
										<Button size="lg">Select</Button>
									</div>
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

					<div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-10 my-6">
						<Card
							className="flex flex-col cursor-pointer hover:scale-[1.05] transition-all"
							onClick={() => {
								router.push(`/${selectedCategorySlug}/list`);
							}}
						>
							<CardHeader className="pb-4">
								<CardTitle className="text-xl">
									🗒 List Mode
								</CardTitle>
							</CardHeader>

							<CardContent>
								<p className="sm:text-lg">
									All questions are visible upfront, and team
									members can pick the ones they're most
									comfortable answering.
								</p>
								<div className="flex justify-end mt-6">
									<Button size="lg">Select</Button>
								</div>
							</CardContent>
						</Card>

						<Card
							className="flex flex-col cursor-pointer hover:scale-[1.05] transition-all"
							onClick={() => {
								router.push(`/${selectedCategorySlug}/mystery`);
							}}
						>
							<CardHeader className="pb-4">
								<CardTitle className="text-xl">
									🎲 Mystery mode
								</CardTitle>
							</CardHeader>

							<CardContent>
								<p className="sm:text-lg">
									Questions stay hidden until revealed by the
									host. Choose how many questions to include
									and uncover them together during the
									session!
								</p>
								<div className="flex justify-end mt-6">
									<Button size="lg">Select</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}
