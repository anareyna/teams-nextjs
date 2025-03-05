import { http, HttpResponse } from "msw";
import { mockQuestions } from "../test-data/questions";

export const questionsHandlers = [
	http.get("/api/questions", ({ request }) => {
		const url = new URL(request.url);
		const count = url.searchParams.get("count");

		switch (count) {
			case "1":
				return HttpResponse.json([mockQuestions[0]]);
			case "2":
				return HttpResponse.json(mockQuestions.slice(0, 2));
			case "3":
				return HttpResponse.json(mockQuestions);
			case "4":
				return HttpResponse.json([
					...mockQuestions,
					{ id: "4", text: "q4" },
				]);
			default:
				return HttpResponse.json(
					{ error: "Invalid count" },
					{ status: 400 }
				);
		}
	}),

	http.get("/api/questions/:slug", ({ params }) => {
		const { slug } = params;

		if (slug === "invalid-slug") {
			return HttpResponse.json(
				{ questions: [], mode: null },
				{ status: 404 }
			);
		}

		return HttpResponse.json({
			questions: mockQuestions,
			mode: "list",
		});
	}),

	http.post("/api/questions/save", async ({ request }) => {
		const { questionIds, mode } = (await request.json()) as {
			questionIds: string[];
			mode: string;
		};

		if (
			!questionIds ||
			!Array.isArray(questionIds) ||
			questionIds.length === 0
		) {
			return HttpResponse.json(
				{ error: "Invalid question IDs" },
				{ status: 400 }
			);
		}

		if (!mode || !["list", "mystery"].includes(mode)) {
			return HttpResponse.json(
				{ error: "Invalid mode" },
				{ status: 400 }
			);
		}

		return HttpResponse.json({ slug: "abc123", mode });
	}),

	http.get("/api/guest-id", () => {
		return HttpResponse.json({ guestId: "mocked-guest-id" });
	}),
];
