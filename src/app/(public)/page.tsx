import QuestionListClient from "@/components/QuestionListClient/QuestionListClient";
import { DEFAULT_QUESTION_COUNT } from "@/lib/constants";

export default function Home() {
	return (
		<div>
			<h1 className="heading-primary">👋 Welcome to IceQ!</h1>
			<p className="text-xl mb-6">
				IceQ helps spark meaningful conversations, whether you're with
				your team, friends, or a close group.
			</p>

			<QuestionListClient initialQuestionCount={DEFAULT_QUESTION_COUNT} />
		</div>
	);
}
