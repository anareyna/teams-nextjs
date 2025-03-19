import FlipCardGridShared from "@/components/FlipCardGridShared/FlipCardGridShared";
import ListCardGrid from "@/components/ListCardGrid/ListCardGrid";
import SharedBlock from "@/components/SharedBlock/SharedBlock";
import { getGuestId } from "@/lib/guestId";
import { notFound } from "next/navigation";

export default async function SharedPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const guestId = await getGuestId();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/${slug}`
	);

	if (!response.ok) {
		notFound();
	}

	const { questions, mode, hostId, flippedCards } = await response.json();

	const isHost = guestId === hostId;

	return (
		<div>
			<h1 className="heading-primary">
				{isHost ? "Host" : "Guest"}, You're In! 🎉
			</h1>
			<div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 items-center">
				<p className="sm:text-lg ">
					Copy this link to share with others:
				</p>
				<SharedBlock
					shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/shared/${slug}`}
				/>
			</div>
			<p className="sm:text-lg mb-6">
				{mode === "list" &&
					"These are the selected questions. Take a moment to read them and choose any question you'd like to answer."}
				{mode === "mystery" && isHost && (
					<span>
						Wait for guests to to pick a question number then{" "}
						<b>
							click on a card to reveal it to everyone in real
							time
						</b>
						.
					</span>
				)}

				{mode === "mystery" && !isHost && (
					<span>
						These are the selected questions. Pick a number and{" "}
						<b>wait for your host</b> to reveal them one by one.
					</span>
				)}
			</p>

			{mode === "mystery" ? (
				<FlipCardGridShared
					questions={questions}
					viewer={isHost ? "host" : "guest"}
					slug={slug}
					initialFlippedCards={flippedCards || []}
				/>
			) : (
				<ListCardGrid questions={questions} />
			)}
		</div>
	);
}
