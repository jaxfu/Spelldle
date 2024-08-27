import {
	type T_TOKENS,
	INIT_TOKENS,
	type T_USERDATA_STATE,
	T_AUTH_STATUS,
	INIT_AUTH_STATUS,
} from "../types";
import { LOCAL_STORAGE_TOKENS_KEYS } from "./consts";
import { apiRequestValidateSession } from "./requests";

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
