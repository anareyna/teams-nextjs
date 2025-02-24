import { QUESTION_CATEGORIES } from "./constants";

export function getSelectedCategoryData(slug: string) {
	return QUESTION_CATEGORIES.find((category) => category.slug === slug);
}
