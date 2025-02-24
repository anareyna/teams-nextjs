export default async function MysteryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	return (
		<div>
			<h1>mystery page {category}</h1>
		</div>
	);
}
