import { db } from "@/drizzle/db";
import { sharedQuestionsTable } from "@/drizzle/schema";
import { getGuestId } from "@/lib/guestId";

import { pusher } from "@/lib/pusher";

import { eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const localId = await getGuestId();
	try {
		const { slug } = await params;
		const { cardIndex } = await req.json();
		const guestId = localId;

		const sharedQuestions = await db
			.select({
				guestId: sharedQuestionsTable.guestId,
				flippedCards: sharedQuestionsTable.flippedCards,
			})
			.from(sharedQuestionsTable)
			.where(eq(sharedQuestionsTable.slug, slug))
			.limit(1)
			.execute();

		if (!sharedQuestions.length) {
			return NextResponse.json(
				{ error: "Shared questions not found" },
				{ status: 404 }
			);
		}

		const { guestId: hostId, flippedCards } = sharedQuestions[0] as {
			guestId: string;
			flippedCards: number[];
		};

		if (guestId !== hostId) {
			return NextResponse.json(
				{ error: "Only the host can flip cards" },
				{ status: 403 }
			);
		}

		const updatedFlippedCards = Array.isArray(flippedCards)
			? [...flippedCards]
			: [];

		const cardIndex_int = parseInt(cardIndex.toString());
		const existingIndex = updatedFlippedCards.indexOf(cardIndex_int);
		if (existingIndex !== -1) {
			updatedFlippedCards.splice(existingIndex, 1);
		} else {
			updatedFlippedCards.push(cardIndex_int);
		}

		await db
			.update(sharedQuestionsTable)
			.set({ flippedCards: updatedFlippedCards })
			.where(eq(sharedQuestionsTable.slug, slug))
			.execute();

		await pusher.trigger(`shared-questions-${slug}`, "card-flipped", {
			cardIndex: cardIndex_int,
			flippedCards: updatedFlippedCards,
			isFlipped: existingIndex === -1,
		});

		return NextResponse.json({
			success: true,
			flippedCards: updatedFlippedCards,
			isFlipped: existingIndex === -1,
		});
	} catch (error) {
		console.error("Error flipping card:", error);
		return NextResponse.json(
			{ error: "Error flipping card" },
			{ status: 500 }
		);
	}
}
