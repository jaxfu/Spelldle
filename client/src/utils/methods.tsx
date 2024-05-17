import CATEGORY_INFO from "../CATEGORY_INFO";
import { T_CATEGORY } from "../types";

export function getRecommendations(e: any, values: string[]): string[] {
	const output: string[] = [];

	for (const option of values) {
		if (option.toLowerCase() === e.target.value.toLowerCase()) {
			return [];
		} else if (option.toLowerCase().includes(e.target.value.toLowerCase())) {
			output.push(option);
		}
	}

	return output;
}

export function onRecommendationClick(
	key: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>
): void {
	setInputValue(key);
	setRecommendations([]);
}

export function getUniqueItems(
	category: T_CATEGORY,
	singleInput: JSX.Element,
	multiInput: JSX.Element,
	levelRitualToggle: JSX.Element,
	componentsSelection: JSX.Element
): JSX.Element {
	switch (category) {
		case CATEGORY_INFO.SCHOOL:
		case CATEGORY_INFO.CASTING_TIME:
		case CATEGORY_INFO.RANGE:
		case CATEGORY_INFO.TARGET:
			return singleInput;
			break;
		case CATEGORY_INFO.LEVEL:
			return (
				<>
					{levelRitualToggle}
					{singleInput}
				</>
			);
			break;
		case CATEGORY_INFO.COMPONENTS:
			return componentsSelection;
			break;
		case CATEGORY_INFO.CLASS:
		case CATEGORY_INFO.EFFECTS:
			return multiInput;
			break;
		default:
			return <></>;
	}
}
