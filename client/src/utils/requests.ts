import axios, { AxiosResponse } from "axios";
import {
	T_APIRESULT_LOGIN,
	T_USERINPUT_LOGIN,
	T_APIRESULT_REGISTER,
	T_USERINPUT_REGISTER,
	type T_APIRESULT_VALIDATE_SESSION,
} from "../types";
import { T_USERDATA_TOKENS } from "../types";

// Routes
const prefix: string =
	import.meta.env.DEV == true ? "http://localhost:5000" : "";
const LOGIN_ROUTE: string = prefix + "/api/login";
const REGISTER_ROUTE: string = prefix + "/api/register";
const VALIDATE_ROUTE: string = prefix + "/api/validateSession";

export async function apiRequestLogin(
	userInput: T_USERINPUT_LOGIN
): Promise<AxiosResponse<T_APIRESULT_LOGIN>> {
	try {
		return await axios<T_APIRESULT_LOGIN>({
			method: "POST",
			url: LOGIN_ROUTE,
			data: {
				...userInput,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function apiRequestRegister(
	userInput: T_USERINPUT_REGISTER
): Promise<AxiosResponse<T_APIRESULT_REGISTER>> {
	try {
		return await axios<T_APIRESULT_REGISTER>({
			method: "POST",
			url: REGISTER_ROUTE,
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
	userDataTokens: T_USERDATA_TOKENS
): Promise<AxiosResponse<T_APIRESULT_VALIDATE_SESSION>> {
	console.log("Running apiRequestValidateSession");
	try {
		return await axios<T_APIRESULT_VALIDATE_SESSION>({
			method: "POST",
			url: VALIDATE_ROUTE,
			data: {
				...userDataTokens,
			},
		});
	} catch (err: any) {
		throw new Error(err);
	}
}
