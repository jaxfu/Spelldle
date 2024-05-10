import { IProps } from "./TurnCell";

export function getRecommendations(
	e: React.ChangeEvent<HTMLInputElement>,
	props: IProps
): string[] {
	if (e.target.value == "") {
		return [];
	}

	const output: string[] = [];

	for (const option of props.category.values) {
		if (option.toLowerCase().includes(e.target.value.toLowerCase())) {
			output.push(option);
		}
	}

	return output;
}
