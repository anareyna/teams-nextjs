import QuestionListClient from "@/components/QuestionListClient/QuestionListClient";
import { DEFAULT_QUESTION_COUNT } from "@/lib/constants";
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
			<h1 className="heading-primary">{categoryData.title}</h1>
			<QuestionListClient
				initialQuestionCount={DEFAULT_QUESTION_COUNT}
				categoryId={categoryData.id}
			/>
		</div>
	);
}
