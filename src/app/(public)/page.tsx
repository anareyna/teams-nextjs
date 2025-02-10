import RandomQuestion from "@/components/RandomQuestion/RandomQuestion";

export default async function Home() {
	const res = await fetch("http://localhost:3000/api/questions");
	const questions = await res.json();

	return (
		<div>
			<h1 className="text-5xl font-bold mb-6">Questions</h1>
			<RandomQuestion questions={questions} />
		</div>
	);
}
