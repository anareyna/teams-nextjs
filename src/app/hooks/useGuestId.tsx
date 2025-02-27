"use client";

import { useEffect, useState } from "react";

export default function useGuestId() {
	const [guestId, setGuestId] = useState<string | null>(null);
	const storageName = "iceq_guestId";

	useEffect(() => {
		if (typeof window === "undefined") return;

		let storedGuestId = localStorage.getItem(storageName);
		if (!storedGuestId) {
			storedGuestId = crypto.randomUUID();
			localStorage.setItem(storageName, storedGuestId);
		}

		setGuestId(storedGuestId);
	}, []);

	return guestId;
}
