import FlipCardGrid from "@/components/FlipCardGrid/FlipCardGrid";
import ListCardGrid from "@/components/ListCardGrid/ListCardGrid";
import SharedBlock from "@/components/SharedBlock/SharedBlock";
import { notFound } from "next/navigation";

export default async function SharedPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/${slug}`
	);

	if (!response.ok) {
		notFound();
	}

	const { questions, mode } = await response.json();

	return (
		<div>
			<h1 className="heading-primary">You're In! 🎉</h1>
			<div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 items-center">
				<p className="sm:text-lg ">
					Copy this link to share with others:
				</p>
				<SharedBlock
					shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/shared/${slug}`}
				/>
			</div>
			<p className="sm:text-lg mb-6">
				{mode === "mystery"
					? "These are the selected questions. Pick a number and wait for your host to reveal them one by one."
					: "These are the selected questions. Take a moment to read them and choose any question you'd like to answer."}
			</p>

			{mode === "mystery" ? (
				<FlipCardGrid questions={questions} />
			) : (
				<ListCardGrid questions={questions} />
			)}
		</div>
	);
}
