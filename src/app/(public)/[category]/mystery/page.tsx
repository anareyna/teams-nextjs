import HostBar from "@/components/HostBar/HostBar";
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
			<HostBar bullets={["Only you can flip the cards."]} />
			<QuestionsClient categoryId={categoryData.id} mode="mystery" />
		</div>
	);
}
