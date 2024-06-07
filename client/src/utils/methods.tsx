import {
	type T_ALL_CURRENT_GUESS_INFO,
	type T_USERDATA_TOKENS,
	INIT_USERDATA_TOKENS,
	type T_USERDATA_STATE,
	INIT_USERDATA_STATE,
	type T_APIRESULTS,
	type T_APIREQUEST_MAKE_GUESS,
	INIT_APIREQUEST_MAKE_GUESS,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../types";
import TextInput from "../components/TurnBox/children/TurnCell/children/TextInput/TextInput";
import LevelRitualToggle from "../components/TurnBox/children/TurnCell/children/LevelRitualToggle/LevelRitualToggle";
import ComponentsSelection from "../components/TurnBox/children/TurnCell/children/ComponentsSelection/ComponentsSelection";
import { LOCAL_STORAGE_TOKENS_KEYS } from "./consts";
import CATEGORY_INFO from "../CATEGORY_INFO.json";

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
export function getUniqueComponents(
	category_name: string,
	category_values: string[],
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
	setRecommendations: React.Dispatch<React.SetStateAction<string[]>>,
	allCurrentGuessInfo: React.MutableRefObject<T_ALL_CURRENT_GUESS_INFO>
): JSX.Element {
	const singleInput = (
		<TextInput
			category_name={category_name}
			recommendationValues={category_values}
			setRecommendations={setRecommendations}
			multi={false}
			inputValue={inputValue}
			setInputValue={setInputValue}
			allCurrentGuessInfo={allCurrentGuessInfo}
		/>
	);
	const multiInput = (
		<TextInput
			category_name={category_name}
			recommendationValues={category_values}
			setRecommendations={setRecommendations}
			multi={true}
			inputValue={inputValue}
			setInputValue={setInputValue}
			allCurrentGuessInfo={allCurrentGuessInfo}
		/>
	);

	switch (category_name) {
		case CATEGORY_INFO.SCHOOL.name:
		case CATEGORY_INFO.CASTING_TIME.name:
		case CATEGORY_INFO.RANGE.name:
		case CATEGORY_INFO.TARGET.name:
		case CATEGORY_INFO.DURATION.name:
			return singleInput;
			break;
		case CATEGORY_INFO.LEVEL.name:
			return (
				<>
					<LevelRitualToggle allCurrentGuessInfo={allCurrentGuessInfo} />
					{singleInput}
				</>
			);
			break;
		case CATEGORY_INFO.COMPONENTS.name:
			return <ComponentsSelection allCurrentGuessInfo={allCurrentGuessInfo} />;
			break;
		case CATEGORY_INFO.CLASS.name:
		case CATEGORY_INFO.EFFECTS.name:
			return multiInput;
			break;
		default:
			return <></>;
	}
}

// TurnBox
export function createNewSpellInfoMap(): T_ALL_CURRENT_GUESS_INFO {
	const map = new Map();
	map.set("School", "");
	map.set("Level", ["", false]);
	map.set("Casting Time", "");
	map.set("Range", "");
	map.set("Target", "");
	map.set("Duration", "");
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

// Login
export function logoutUser(
	setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>
): void {
	clearTokensFromLocalStorage();
	setUserIsLoggedIn(false);
	setUserData(deepCopyObject(INIT_USERDATA_STATE));
}

// Storage
export function areTokensInLocalStorage(): boolean {
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

export function sendTokensToLocalStorage(userDataTokens: T_USERDATA_TOKENS) {
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
	console.log("CLEARING TOKENS FROM LOCALSOTRAGE");
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
	setEnableQueryFn: React.Dispatch<React.SetStateAction<boolean>>
): void {
	console.log(
		`Setting userData: ${JSON.stringify(
			createUserDataStateFromApiResult(data)
		)}`
	);
	setUserData(createUserDataStateFromApiResult(data));
	setUserIsLoggedIn(true);
	setEnableQueryFn(false);
}

export function createRequestObjectFromCurrentGuessInfo(
	currentGuessInfo: T_ALL_CURRENT_GUESS_INFO,
	categoryInfo: T_ALL_POSSIBLE_CATEGORIES_INFO
): T_APIREQUEST_MAKE_GUESS {
	const requestObject: T_APIREQUEST_MAKE_GUESS = deepCopyObject(
		INIT_APIREQUEST_MAKE_GUESS
	);

	// SCHOOOL
	const schoolGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.SCHOOL.name
	) as string;
	const schoolRequestValue = categoryInfo.SCHOOL.id_map.get(
		schoolGuessValue.toLowerCase()
	) as number;
	requestObject.school = schoolRequestValue;

	// LEVEL
	const levelGuessValue = currentGuessInfo.get(CATEGORY_INFO.LEVEL.name) as [
		string,
		boolean
	];
	const levelRequestValue: { level: number; is_ritual: boolean } = {
		level: categoryInfo.LEVEL.id_map.get(
			levelGuessValue[0].toLowerCase()
		) as number,
		is_ritual: levelGuessValue[1],
	};
	requestObject.level = levelRequestValue;

	// CASTING_TIME
	const castingTimeGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.CASTING_TIME.name
	) as string;
	const castingTimeRequestValue = categoryInfo.CASTING_TIME.id_map.get(
		castingTimeGuessValue.toLowerCase()
	) as number;
	requestObject.casting_time = castingTimeRequestValue;

	// RANGE
	const rangeGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.RANGE.name
	) as string;
	const rangeRequestValue = categoryInfo.RANGE.id_map.get(
		rangeGuessValue.toLowerCase()
	) as number;
	requestObject.range = rangeRequestValue;

	// TARGET
	const targetGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.TARGET.name
	) as string;
	const targetRequestValue = categoryInfo.TARGET.id_map.get(
		targetGuessValue.toLowerCase()
	) as number;
	requestObject.target = targetRequestValue;

	// DURATION
	const durationGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.DURATION.name
	) as string;
	const durationRequestValue = categoryInfo.DURATION.id_map.get(
		durationGuessValue.toLowerCase()
	) as number;
	requestObject.duration = durationRequestValue;

	// COMPONENTS
	const componentsGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.COMPONENTS.name
	) as string[];
	const componentsRequestValue: number[] = [];
	componentsGuessValue.forEach((component) => {
		componentsRequestValue.push(
			categoryInfo.COMPONENTS.id_map.get(component.toLowerCase()) as number
		);
	});
	requestObject.components = componentsRequestValue.sort((a, b) => a - b);

	// CLASS
	const classGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.CLASS.name
	) as string[];
	const classRequestValue: number[] = [];
	classGuessValue.forEach((component) => {
		classRequestValue.push(
			categoryInfo.CLASS.id_map.get(component.toLowerCase()) as number
		);
	});
	requestObject.class = classRequestValue.sort((a, b) => a - b);

	// EFFECTS
	const effectsGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.EFFECTS.name
	) as string[];
	const effectsRequestValue: number[] = [];
	effectsGuessValue.forEach((component) => {
		effectsRequestValue.push(
			categoryInfo.EFFECTS.id_map.get(component.toLowerCase()) as number
		);
	});
	requestObject.effects = effectsRequestValue.sort((a, b) => a - b);

	console.log(JSON.stringify(requestObject));

	return requestObject;
}

function createMapFromValues(arr: string[]) {
	const map = new Map();
	arr.forEach((item: string, index: number) => {
		map.set(item.toLowerCase(), index);
	});
	return map;
}

export function getAllCategoriesInfo(): T_ALL_POSSIBLE_CATEGORIES_INFO {
	const infoObj: T_ALL_POSSIBLE_CATEGORIES_INFO =
		CATEGORY_INFO as T_ALL_POSSIBLE_CATEGORIES_INFO;

	infoObj.SCHOOL.id_map = createMapFromValues(infoObj.SCHOOL.values);
	infoObj.LEVEL.id_map = createMapFromValues(infoObj.LEVEL.values);
	infoObj.CASTING_TIME.id_map = createMapFromValues(
		infoObj.CASTING_TIME.values
	);
	infoObj.RANGE.id_map = createMapFromValues(infoObj.RANGE.values);
	infoObj.TARGET.id_map = createMapFromValues(infoObj.TARGET.values);
	infoObj.DURATION.id_map = createMapFromValues(infoObj.DURATION.values);
	infoObj.COMPONENTS.id_map = createMapFromValues(infoObj.COMPONENTS.values);
	infoObj.CLASS.id_map = createMapFromValues(infoObj.CLASS.values);
	infoObj.EFFECTS.id_map = createMapFromValues(infoObj.EFFECTS.values);

	return infoObj;
}
