"use client";

import { useEffect, useState } from "react";

export default function useGuestId() {
	const [guestId, setGuestId] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		async function getGuestId() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/guest-id`
				);
				const data = await response.json();
				setGuestId(data.guestId);
			} catch (error) {
				console.error("Error fetching guestId:", error);
			}
		}

		getGuestId();
	}, []);

	return guestId;
}
