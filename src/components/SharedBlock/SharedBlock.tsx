import { Loader2 } from "lucide-react";
import CopyButton from "../CopyButton/CopyButton";

type ShareBlockProps = {
	isLoading: boolean;
	numberOfQuestions: number;
	shareUrl: string;
};
export default function SharedBlock({
	isLoading,
	numberOfQuestions,
	shareUrl,
}: ShareBlockProps) {
	return (
		<div className="flex flex-col gap-4 p-5 items-center">
			<p className="font-semibold ">
				{isLoading
					? "Generating your shared link..."
					: `Your ${
							numberOfQuestions > 1
								? "questions are"
								: "question is"
					  } ready!`}
			</p>

			<div className="flex items-center gap-4">
				{isLoading ? (
					<Loader2 className="animate-spin" />
				) : (
					<>
						<pre className="bg-indigo-100 px-4 py-2 rounded-md select-all break-all">
							<a
								href={shareUrl}
								className="text-indigo-700 hover:underline font-semibold text-wrap"
							>
								{shareUrl}
							</a>
						</pre>
						<CopyButton text={shareUrl} />
					</>
				)}
			</div>
		</div>
	);
}
