import { useState } from "react";
import { Button } from "../ui/button";

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
		<Button onClick={handleCopy}>{isCopied ? "Copied!" : "Copy"}</Button>
	);
}
