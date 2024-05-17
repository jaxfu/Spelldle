import { IProps } from "./TurnCell";

export function getRecommendations(e: any, props: IProps): string[] {
	const output: string[] = [];

	for (const option of props.category.values) {
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
) {
	console.log(key);
	setInputValue(key);
	setRecommendations([]);
}
