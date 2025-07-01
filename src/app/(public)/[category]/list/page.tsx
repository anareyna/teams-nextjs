import HostBar from "@/components/HostBar/HostBar";
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
			<HostBar
				bullets={["Adjust the number of questions or shuffle them."]}
			/>

			<QuestionsClient mode="list" categoryId={categoryData.id} />
		</div>
	);
}
