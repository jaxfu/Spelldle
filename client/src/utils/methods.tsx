import {
	type T_TOKENS,
	INIT_TOKENS,
	type T_USERDATA_STATE,
	INIT_USERDATA_STATE,
	type T_APIRESULTS,
	T_AUTH_STATUS,
	INIT_AUTH_STATUS,
} from "../types";
import {
	type T_ALL_CURRENT_GUESS_INFO,
	type T_GUESS_CATEGORIES,
	INIT_GUESS_CATEGORIES,
} from "../methods/guesses";
import { LOCAL_STORAGE_TOKENS_KEYS } from "./consts";
import CATEGORY_INFO from "../data/CATEGORY_INFO.json";
import { apiRequestValidateSession } from "../methods/requests";
import { AxiosResponse } from "axios";

export function deepCopyObject<T extends Object>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

// TextInput
export function onAddGuessClick(
	setGuesses: React.Dispatch<React.SetStateAction<string[]>>,
	inputValue: string,
	setInputValue: React.Dispatch<React.SetStateAction<string>>,
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
	guess: string,
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
	setUserData: React.Dispatch<React.SetStateAction<T_USERDATA_STATE>>,
): void {
	clearTokensFromLocalStorage();
	setUserIsLoggedIn(false);
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

export function getUserSessionDataFromStorage(): T_TOKENS {
	const userDataTokens: T_TOKENS = { ...INIT_TOKENS };

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

export function sendTokensToLocalStorage(userDataTokens: T_TOKENS) {
	localStorage.setItem(
		LOCAL_STORAGE_TOKENS_KEYS.access_token,
		userDataTokens.access_token,
	);
	localStorage.setItem(
		LOCAL_STORAGE_TOKENS_KEYS.refresh_token,
		userDataTokens.refresh_token,
	);

	console.log("Sent to localStorage: ");
	console.log(
		`${LOCAL_STORAGE_TOKENS_KEYS.access_token}: ${userDataTokens.access_token}`,
	);
	console.log(
		`${LOCAL_STORAGE_TOKENS_KEYS.refresh_token}: ${userDataTokens.refresh_token}`,
	);
}

export function clearTokensFromLocalStorage() {
	console.log("CLEARING TOKENS FROM LOCALSOTRAGE");
	localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.access_token);
	localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEYS.refresh_token);
}

export function createRequestObjectFromCurrentGuessInfo(
	currentGuessInfo: T_ALL_CURRENT_GUESS_INFO,
	categoryInfo: T_CATEGORY_INFO_ALL,
): T_GUESS_CATEGORIES {
	const requestObject: T_GUESS_CATEGORIES = deepCopyObject(
		INIT_GUESS_CATEGORIES,
	);

	// SCHOOOL
	const schoolGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.SCHOOL.name,
	) as string;
	const schoolRequestValue = categoryInfo.SCHOOL.id_map.get(
		schoolGuessValue.toLowerCase(),
	) as number;
	requestObject.school = schoolRequestValue;

	// LEVEL
	const levelGuessValue = currentGuessInfo.get(CATEGORY_INFO.LEVEL.name) as [
		string,
		boolean,
	];
	const levelRequestValue: { level: number; is_ritual: boolean } = {
		level: categoryInfo.LEVEL.id_map.get(
			levelGuessValue[0].toLowerCase(),
		) as number,
		is_ritual: levelGuessValue[1],
	};
	requestObject.level = levelRequestValue;

	// CASTING_TIME
	const castingTimeGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.CASTING_TIME.name,
	) as string;
	const castingTimeRequestValue = categoryInfo.CASTING_TIME.id_map.get(
		castingTimeGuessValue.toLowerCase(),
	) as number;
	requestObject.casting_time = castingTimeRequestValue;

	// RANGE
	const rangeGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.RANGE.name,
	) as string;
	const rangeRequestValue = categoryInfo.RANGE.id_map.get(
		rangeGuessValue.toLowerCase(),
	) as number;
	requestObject.range = rangeRequestValue;

	// TARGET
	const targetGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.TARGET.name,
	) as string;
	const targetRequestValue = categoryInfo.TARGET.id_map.get(
		targetGuessValue.toLowerCase(),
	) as number;
	requestObject.target = targetRequestValue;

	// DURATION
	const durationGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.DURATION.name,
	) as string;
	const durationRequestValue = categoryInfo.DURATION.id_map.get(
		durationGuessValue.toLowerCase(),
	) as number;
	requestObject.duration = durationRequestValue;

	// COMPONENTS
	const componentsGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.COMPONENTS.name,
	) as string[];
	const componentsRequestValue: number[] = [];
	componentsGuessValue.forEach((component) => {
		componentsRequestValue.push(
			categoryInfo.COMPONENTS.id_map.get(component.toLowerCase()) as number,
		);
	});
	requestObject.components = componentsRequestValue.sort((a, b) => a - b);

	// CLASS
	const classGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.CLASS.name,
	) as string[];
	const classRequestValue: number[] = [];
	classGuessValue.forEach((component) => {
		classRequestValue.push(
			categoryInfo.CLASS.id_map.get(component.toLowerCase()) as number,
		);
	});
	requestObject.class = classRequestValue.sort((a, b) => a - b);

	// EFFECTS
	const effectsGuessValue = currentGuessInfo.get(
		CATEGORY_INFO.EFFECTS.name,
	) as string[];
	const effectsRequestValue: number[] = [];
	effectsGuessValue.forEach((component) => {
		effectsRequestValue.push(
			categoryInfo.EFFECTS.id_map.get(component.toLowerCase()) as number,
		);
	});
	requestObject.effects = effectsRequestValue.sort((a, b) => a - b);

	console.log(JSON.stringify(requestObject));

	return requestObject;
}

export async function getAuthStatus(): Promise<T_AUTH_STATUS> {
	console.log("running getAuthStatus");

	const authStatus = deepCopyObject(INIT_AUTH_STATUS);

	try {
		if (!areTokensInLocalStorage()) return authStatus;

		const res = await apiRequestValidateSession(
			getUserSessionDataFromStorage(),
		);

		console.log("tokens found");
		authStatus.has_tokens = true;
		authStatus.valid = res.data.valid;
		authStatus.user_data = res.data.user_data;
	} catch (error) {
		throw error;
	}

	return authStatus;
}
