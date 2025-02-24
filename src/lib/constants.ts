export const DEFAULT_QUESTION_COUNT = 3;
export const QUESTION_CATEGORIES = [
	{
		id: "5987b68f-9661-4221-8772-2af2e389af4a",
		slug: "work",
		title: "💼 Team Connect",
		description:
			"Perfect for colleagues and professional settings. Get to know your team in a fun way.",
	},
	{
		id: "e5a0d881-1ab3-4e18-a226-d47b8170d117",
		slug: "friends",
		title: "🤗 Close Connections",
		description:
			"Great for friends and close groups. Strengthen your bond and create lasting memories.",
	},
] as const;

export const QUESTION_MODES = ["list", "mystery"] as const;
