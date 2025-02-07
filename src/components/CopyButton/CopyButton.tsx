import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
	const [isCopied, setIsCopied] = useState(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	}
	return (
		<button onClick={handleCopy}>{isCopied ? "Copied!" : "Copy"}</button>
	);
}
