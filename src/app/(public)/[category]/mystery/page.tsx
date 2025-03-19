import QuestionsClient from "@/components/QuestionsClient/QuestionsClient";
import { getSelectedCategoryData } from "@/lib/helpers";

export default async function MysteryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	const categoryData = getSelectedCategoryData(category);

	if (!categoryData) {
		return (
			<div>
				<h1 className="heading-primary">Category not found</h1>
				<p className="text-lg">
					The category "{category}" does not exist.
				</p>
			</div>
		);
	}
	return (
		<div>
			<h1 className="heading-primary">
				{categoryData.title} - Mystery mode
			</h1>
			<p className="mb-10 bg-orange-800 p-4 rounded-md">
				<strong className="sm:text-lg">Host Preview:</strong>
				<br /> As the host, only you can flip the cards. You can adjust
				the number of questions or get new ones. Once you're happy with
				your selection, click <strong>"Share this list"</strong> to send
				it to others and hide the cards.
			</p>
			<QuestionsClient categoryId={categoryData.id} mode="mystery" />
		</div>
	);
}
