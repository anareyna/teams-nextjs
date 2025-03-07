import CopyButton from "../CopyButton/CopyButton";

export default function SharedBlock({ shareUrl }: { shareUrl: string }) {
	return (
		<p className="flex items-stretch">
			<span className="bg-indigo-100 px-4 py-2 rounded-s-md text-sm text-indigo-700 font-semibold font-mono break-all">
				{shareUrl}
			</span>
			<CopyButton text={shareUrl} className="rounded-l-none h-auto" />
		</p>
	);
}
