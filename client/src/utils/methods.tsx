import CATEGORY_INFO from "../CATEGORY_INFO";
import {
	type T_SINGLE_CATEGORY_POSSIBILITIES,
	type T_SPELL_INFO,
	type T_USERDATA_TOKENS,
	INIT_USERDATA_TOKENS,
	type T_USERDATA_STATE,
	type T_APIRESULT_LOGIN,
	type T_APIRESULT_REGISTER,
	type T_APIRESULT_VALIDATE_ACCESS_TOKEN,
	type T_APIRESULTS,
} from "../types";
import TextInput from "../components/TurnBox/children/TurnCell/children/TextInput/TextInput";
import LevelRitualToggle from "../components/TurnBox/children/TurnCell/children/LevelRitualToggle/LevelRitualToggle";
import ComponentsSelection from "../components/TurnBox/children/TurnCell/children/ComponentsSelection/ComponentsSelection";
import { LOCAL_STORAGE_TOKENS_KEYS } from "./consts";

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

export function deepCopyObject<T extends Object>(obj: T): T {
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

// Storage
export function AreTokensInLocalStorage(): boolean {
	console.log("RUNNING AreTokensInLocalStorage()");
	return (
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.access_token) !== null &&
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token) !== null &&
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.access_token) !== "" &&
		localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token) !== ""
	);
}

export function getUserSessionDataFromStorage(): T_USERDATA_TOKENS {
	const userDataTokens: T_USERDATA_TOKENS = { ...INIT_USERDATA_TOKENS };

	try {
		userDataTokens.access_token =
			localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.access_token) || "";
		userDataTokens.refresh_token =
			localStorage.getItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token) || "";
		return userDataTokens;
	} catch (err: any) {
		throw new Error(`Error in getUserSessionDataFromStorage: ${err}`);
	}
}

export function sendToLocalStorage(userDataTokens: T_USERDATA_TOKENS) {
	localStorage.setItem(
		LOCAL_STORAGE_TOKENS_KEYS.access_token,
		userDataTokens.access_token
	);
	localStorage.setItem(
		LOCAL_STORAGE_TOKENS_KEYS.refresh_token,
		userDataTokens.refresh_token
	);

	console.log("Sent to localStorage: ");
	console.log(
		`${LOCAL_STORAGE_TOKENS_KEYS.access_token}: ${userDataTokens.access_token}`
	);
	console.log(
		`${LOCAL_STORAGE_TOKENS_KEYS.refresh_token}: ${userDataTokens.refresh_token}`
	);
}

export function clearTokensFromLocalStorage() {
	localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.access_token);
	localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token);
}

// Data
export function createUserDataStateFromApiResult(
	apiResult: T_APIRESULTS
): T_USERDATA_STATE {
	return {
		user_id: apiResult.user_id,
		user_data_account: apiResult.user_data_account,
		user_data_personal: apiResult.user_data_personal,
	};
}

export function setUserDataFromAPIResult(
	data: T_APIRESULTS,
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>,
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
	setEnableQueryFn: React.Dispatch<React.SetStateAction<boolean>>,
	allowSetUserData: React.MutableRefObject<boolean>
): void {
	console.log(`Setting userData: ${JSON.stringify(data)}`);
	setUserData(createUserDataStateFromApiResult(data));
	setUserIsLoggedIn(true);
	setEnableQueryFn(false);
	allowSetUserData.current = false;
}
