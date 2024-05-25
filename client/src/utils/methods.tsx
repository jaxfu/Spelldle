import CATEGORY_INFO from "../CATEGORY_INFO";
import { T_SINGLE_CATEGORY_POSSIBILITIES, T_SPELL_INFO } from "../types";
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

// TurnCell
export function getUniqueItems(
	category: T_SINGLE_CATEGORY_POSSIBILITIES,
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>,
	setAllCurrentGuessInfo: React.Dispatch<React.SetStateAction<T_SPELL_INFO>>
): JSX.Element {
	const singleInput = (
		<TextInput
			category={category}
			multi={false}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
			setAllCurrentGuessInfo={setAllCurrentGuessInfo}
		/>
	);
	const multiInput = (
		<TextInput
			category={category}
			multi={true}
			inputValue={inputValue}
			setInputValue={setInputValue}
			recommendationValues={category.values}
			setRecommendations={setRecommendations}
			setAllCurrentGuessInfo={setAllCurrentGuessInfo}
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
					<LevelRitualToggle setAllCurrentGuessInfo={setAllCurrentGuessInfo} />
					{singleInput}
				</>
			);
			break;
		case CATEGORY_INFO.COMPONENTS:
			return (
				<ComponentsSelection setAllCurrentGuessInfo={setAllCurrentGuessInfo} />
			);
			break;
		case CATEGORY_INFO.CLASS:
		case CATEGORY_INFO.EFFECTS:
			return multiInput;
			break;
		default:
			return <></>;
	}
}

// TurnBox
export function createNewSpellInfoMap(): T_SPELL_INFO {
	const map = new Map();
	map.set("School", "");
	map.set("Level", ["", false]);
	map.set("Casting Time", "");
	map.set("Range", "");
	map.set("Target", "");
	map.set("Components", []);
	map.set("Class", []);
	map.set("Effects", []);
	return map;
}

// TextInput
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
