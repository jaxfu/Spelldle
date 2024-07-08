import axios, { AxiosResponse } from "axios";
import {
	type T_APIRESULT_LOGIN,
	type T_USERINPUT_LOGIN,
	type T_APIRESULT_REGISTER,
	type T_USERINPUT_REGISTER,
	type T_APIRESULT_VALIDATE_ACCESS_TOKEN,
	type T_ALL_CURRENT_GUESS_INFO,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
	type T_PAST_GUESSES,
} from "../types";
import { T_TOKENS } from "../types";
import { createRequestObjectFromCurrentGuessInfo } from "./methods";

// Routes
const ROUTE_PREFIX: string = import.meta.env.DEV ? "http://localhost:5000" : "";
const API_ROUTES = {
	LOGIN: ROUTE_PREFIX + "/api/login",
	REGISTER: ROUTE_PREFIX + "/api/register",
	VALIDATE: ROUTE_PREFIX + "/api/validateSession",
	MAKE_GUESS: ROUTE_PREFIX + "/api/makeGuess",
	GET_PAST_GUESSES: ROUTE_PREFIX + "/api/getPastGuesses",
};

export async function apiRequestLogin(
	userInput: T_USERINPUT_LOGIN,
): Promise<AxiosResponse<T_APIRESULT_LOGIN>> {
	try {
		return await axios<T_APIRESULT_LOGIN>({
			method: "POST",
			url: API_ROUTES.LOGIN,
			data: {
				...userInput,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestRegister(
	userInput: T_USERINPUT_REGISTER,
): Promise<AxiosResponse<T_APIRESULT_REGISTER>> {
	try {
		return await axios<T_APIRESULT_REGISTER>({
			method: "POST",
			url: API_ROUTES.REGISTER,
			data: {
				username: userInput.username,
				password: userInput.password,
				first_name: userInput.first_name,
				last_name: userInput.last_name,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestValidateSession(
	userDataTokens: T_TOKENS,
): Promise<AxiosResponse<T_APIRESULT_VALIDATE_ACCESS_TOKEN>> {
	console.log("Running apiRequestValidateSession");
	try {
		return await axios<T_APIRESULT_VALIDATE_ACCESS_TOKEN>({
			method: "POST",
			url: API_ROUTES.VALIDATE,
			headers: {
				Authorization: `Bearer ${userDataTokens.access_token}`,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

interface I_APIREQUEST_MAKE_GUESS {
	allCurrentGuessInfo: T_ALL_CURRENT_GUESS_INFO;
	allCategoriesInfo: T_ALL_POSSIBLE_CATEGORIES_INFO;
	accessToken: string;
}

export async function apiRequestMakeGuess(
	paramObject: I_APIREQUEST_MAKE_GUESS,
): Promise<AxiosResponse<string, any>> {
	try {
		const data = createRequestObjectFromCurrentGuessInfo(
			paramObject.allCurrentGuessInfo,
			paramObject.allCategoriesInfo,
		);
		return await axios<string>({
			method: "POST",
			url: API_ROUTES.MAKE_GUESS,
			data,
			headers: {
				Authorization: `Bearer ${paramObject.accessToken}`,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestGetPastGuesses(
	accessToken: string,
): Promise<AxiosResponse<T_PAST_GUESSES, any>> {
	try {
		return await axios<T_PAST_GUESSES>({
			method: "POST",
			url: API_ROUTES.GET_PAST_GUESSES,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}
