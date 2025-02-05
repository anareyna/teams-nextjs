import RandomQuestion from "@/components/RandomQuestion";

export default async function Home() {
	const res = await fetch("http://localhost:3000/api/questions");
	const questions = await res.json();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1 className="text-5xl font-bold mb-6">Questions</h1>
				<RandomQuestion questions={questions} />
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
		</div>
	);
}
