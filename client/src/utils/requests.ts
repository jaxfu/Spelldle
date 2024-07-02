import axios, { AxiosResponse } from "axios";
import {
	type T_APIRESULT_LOGIN,
	type T_USERINPUT_LOGIN,
	type T_APIRESULT_REGISTER,
	type T_USERINPUT_REGISTER,
	type T_APIRESULT_VALIDATE_ACCESS_TOKEN,
	type T_ALL_CURRENT_GUESS_INFO,
	type T_ALL_POSSIBLE_CATEGORIES_INFO,
} from "../types";
import { T_TOKENS } from "../types";
import { createRequestObjectFromCurrentGuessInfo } from "./methods";

// Routes
const prefix: string = import.meta.env.DEV ? "http://localhost:5000" : "";
const APIROUTE_LOGIN: string = prefix + "/api/login";
const APIROUTE_REGISTER: string = prefix + "/api/register";
const APIROUTE_VALIDATE: string = prefix + "/api/validateSession";
const APIROUTE_MAKE_GUESS: string = prefix + "/api/makeGuess";

export async function apiRequestLogin(
	userInput: T_USERINPUT_LOGIN,
): Promise<AxiosResponse<T_APIRESULT_LOGIN>> {
	try {
		return await axios<T_APIRESULT_LOGIN>({
			method: "POST",
			url: APIROUTE_LOGIN,
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
			url: APIROUTE_REGISTER,
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
			url: APIROUTE_VALIDATE,
			headers: {
				Authorization: `Bearer ${userDataTokens.access_token}`,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestMakeGuess(
	allCurrentGuessInfo: T_ALL_CURRENT_GUESS_INFO,
	categoriesInfo: T_ALL_POSSIBLE_CATEGORIES_INFO,
	accessToken: T_TOKENS["access_token"],
): Promise<AxiosResponse<string>> {
	try {
		const data = createRequestObjectFromCurrentGuessInfo(
			allCurrentGuessInfo,
			categoriesInfo,
		);
		return await axios<string>({
			method: "POST",
			url: APIROUTE_MAKE_GUESS,
			data,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}
