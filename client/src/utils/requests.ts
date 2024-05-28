import axios, { HttpStatusCode } from "axios";

// TYPES
import { T_LoginResult, T_UserInput_Login, initLoginResult } from "../types";
import {
	T_RegisterResult,
	T_UserInput_Register,
	initRegisterResult,
} from "../types";
import { T_UserSessionData } from "../types";
import { T_ValidateResult, initValidateResult } from "../types";

// Routes
const prefix: string =
	import.meta.env.DEV == true ? "http://localhost:5000" : "";
const LOGIN_ROUTE: string = prefix + "/api/login";
const REGISTER_ROUTE: string = prefix + "/api/register";
const VALIDATE_ROUTE: string = prefix + "/api/validateSession";

export async function attemptLogin(
	userInput: T_UserInput_Login
): Promise<T_LoginResult> {
	let loginResult: T_LoginResult = {
		...initLoginResult,
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
	userInput: T_UserInput_Register
): Promise<T_RegisterResult> {
	let registerResult: T_RegisterResult = { ...initRegisterResult };

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

export async function validateSession(
	sessionData: T_UserSessionData
): Promise<T_ValidateResult> {
	console.log("Running validateSession");
	console.log(sessionData);
	let validateResult: T_ValidateResult = { ...initValidateResult };

	try {
		const send = await axios({
			method: "POST",
			url: VALIDATE_ROUTE,
			data: {
				...sessionData,
			},
		});

		if (send.status != HttpStatusCode.Ok) {
			validateResult.error = true;
		} else {
			if (send.data.valid) {
				validateResult = { ...send.data };
				validateResult.session_key = sessionData.session_key;
			}
		}
		return validateResult;
	} catch (err: any) {
		throw new Error(err);
	}
}
