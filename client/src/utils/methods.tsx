import CATEGORY_INFO from "../CATEGORY_INFO";
import { T_CATEGORY, T_SPELL_CATEGORY_INFO } from "../types";
import TextInput from "../components/TurnBox/children/TurnCell/children/TextInput/TextInput";
import LevelRitualToggle from "../components/TurnBox/children/TurnCell/children/LevelRitualToggle/LevelRitualToggle";
import ComponentsSelection from "../components/TurnBox/children/TurnCell/children/ComponentsSelection/ComponentsSelection";

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

export function createNewObject<T extends Object>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export function createNewGuessInfoObject(
	categoryName: string,
	newGuessInfo: any,
	currentGuessInfo: T_SPELL_CATEGORY_INFO
): T_SPELL_CATEGORY_INFO {
	const newInfoObj: T_SPELL_CATEGORY_INFO = createNewObject(currentGuessInfo);

	switch (categoryName) {
		case "School":
			newInfoObj.SCHOOL = newGuessInfo;
			break;
		case "Level":
			newInfoObj.LEVEL = newGuessInfo;
			break;
		case "Casting":
			newInfoObj.CASTING = newGuessInfo;
			break;
		case "Range":
			newInfoObj.RANGE = newGuessInfo;
			break;
		case "Target":
			newInfoObj.TARGET = newGuessInfo;
			break;
		case "Components":
			newInfoObj.COMPONENTS = newGuessInfo;
			break;
		case "Class":
			newInfoObj.CLASS = newGuessInfo;
			break;
		case "Effects":
			newInfoObj.EFFECTS = newGuessInfo;
			break;
	}

	return newInfoObj;
}

// TurnCell
export function getUniqueItems(
	category: T_CATEGORY,
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>
): JSX.Element {
	const singleInput = (
		<TextInput
			single={true}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
		/>
	);
	const multiInput = (
		<TextInput
			single={false}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
		/>
	);

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
					<LevelRitualToggle />
					{singleInput}
				</>
			);
			break;
		case CATEGORY_INFO.COMPONENTS:
			return <ComponentsSelection />;
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
