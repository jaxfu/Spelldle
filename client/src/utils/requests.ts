import axios, { HttpStatusCode } from "axios";
import {
	T_APIRESULT_LOGIN,
	T_USERINPUT_LOGIN,
	INIT_APIRESULT_LOGIN,
	T_APIRESULT_REGISTER,
	T_USERINPUT_REGISTER,
	INIT_APIRESULT_REGISTER,
} from "../types";
import { T_USERDATA_TOKENS } from "../types";
import {
	T_APIRESULT_VALIDATE_SESSION,
	INIT_APIRESULT_VALIDATE_SESSION,
} from "../types";

// Routes
const prefix: string =
	import.meta.env.DEV == true ? "http://localhost:5000" : "";
const LOGIN_ROUTE: string = prefix + "/api/login";
const REGISTER_ROUTE: string = prefix + "/api/register";
const VALIDATE_ROUTE: string = prefix + "/api/validateSession";

export async function attemptLogin(
	userInput: T_USERINPUT_LOGIN
): Promise<T_APIRESULT_LOGIN> {
	let loginResult: T_APIRESULT_LOGIN = {
		...INIT_APIRESULT_LOGIN,
	};

	try {
		const send = await axios({
			method: "POST",
			url: LOGIN_ROUTE,
			data: {
				...userInput,
			},
		});

		if (send.status != HttpStatusCode.Ok) {
			loginResult.error = true;
		} else {
			if (send.data.valid) {
				loginResult = { ...send.data };
			}
		}
		return loginResult;
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function attemptRegister(
	userInput: T_USERINPUT_REGISTER
): Promise<T_APIRESULT_REGISTER> {
	let registerResult: T_APIRESULT_REGISTER = { ...INIT_APIRESULT_REGISTER };

	try {
		const send = await axios({
			method: "POST",
			url: REGISTER_ROUTE,
			data: {
				username: userInput.username,
				password: userInput.password,
				first_name: userInput.first_name,
				last_name: userInput.last_name,
			},
		});

		if (send.status != HttpStatusCode.Ok) {
			registerResult.error = true;
		} else {
			if (send.data.valid) {
				registerResult = { ...send.data };
			}
		}
		return registerResult;
	} catch (err: any) {
		throw new Error(err);
	}
}

export async function requestValidateSession(
	sessionData: T_USERDATA_TOKENS
): Promise<T_APIRESULT_VALIDATE_SESSION> {
	console.log("Running validateSession");
	console.log(sessionData);
	let validateResult: T_APIRESULT_VALIDATE_SESSION = {
		...INIT_APIRESULT_VALIDATE_SESSION,
	};

	try {
		const send = await axios({
			method: "POST",
			url: VALIDATE_ROUTE,
			data: {
				...sessionData,
			},
		});

		validateResult = send.data;
		return validateResult;
	} catch (err: any) {
		throw new Error(err);
	}
}
