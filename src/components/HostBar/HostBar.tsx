export default function HostBar({ bullets }: { bullets: string[] }) {
	return (
		<div className="mb-10 text-white dark:text-foreground bg-orange-800/90 p-4 rounded-md">
			<strong className="sm:text-lg">
				<span>🔒</span> Host Mode
			</strong>
			<ul className="list-disc list-inside pl-5">
				{bullets.map((bullet, index) => (
					<li key={index}>{bullet}</li>
				))}
				<li>
					When ready, click on
					<strong> "Share this list"</strong> button to generate a
					link and start the session.
				</li>
			</ul>
		</div>
	);
}
