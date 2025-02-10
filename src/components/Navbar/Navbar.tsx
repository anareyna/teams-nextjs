import { MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
	return (
		<header className="flex py-2 bg-card shadow-sm">
			<nav className="font-medium flex items-center text-sm gap-6 container">
				<Link href="/" className="flex items-center gap-2 mr-auto">
					<MessageCircleQuestion className="h-6 w-6" />
					<span className="text-lg">Teams</span>
				</Link>
				<ModeToggle />
			</nav>
		</header>
	);
}
