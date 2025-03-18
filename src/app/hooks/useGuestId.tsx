"use client";

import { useEffect, useState } from "react";

export default function useGuestId() {
	const [guestId, setGuestId] = useState(null);

	useEffect(() => {
		const fetchGuestId = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/guest-id`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch guestId");
				}
				const data = await response.json();
				setGuestId(data.guestId);
			} catch (error) {
				console.error("Error fetching guestId:", error);
			}
		};

		fetchGuestId();
	}, []);

	return guestId;
}
