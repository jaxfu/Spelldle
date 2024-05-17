import CATEGORY_INFO from "../CATEGORY_INFO";
import { T_CATEGORY } from "../types";

// Multi
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

// TurnCell
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

// MultiTextInput
export function onAddGuessClick(
	setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>
): void {
	setGuesses((guesses: string[]) => {
		const newArr = [...guesses];
		newArr.push(inputValue);
		return newArr;
	});
	setInputValue("");
}

export function onRemoveGuessClick(
	setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
	guess: string
): void {
	setGuesses((guesses) => {
		return guesses.filter((g: string) => {
			return g.toLocaleLowerCase() !== guess.toLocaleLowerCase();
		});
	});
}
