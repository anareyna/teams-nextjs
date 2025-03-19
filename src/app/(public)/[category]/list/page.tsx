import QuestionsClient from "@/components/QuestionsClient/QuestionsClient";
import { getSelectedCategoryData } from "@/lib/helpers";

export default async function ListPage({
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
				{categoryData.title} - List mode
			</h1>
			<p className="mb-10 bg-orange-800 p-4 rounded-md">
				<strong className="sm:text-lg">Host Preview:</strong>
				<br /> As the host, you can adjust the number of questions or
				get new ones. Once you're happy with your selection, click{" "}
				<strong>"Share this list"</strong> to send it to others.
			</p>
			<QuestionsClient mode="list" categoryId={categoryData.id} />
		</div>
	);
}
