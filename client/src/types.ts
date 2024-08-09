import { deepCopyObject } from "./utils/methods";

// USERDATA
export type T_TOKENS = {
	access_token: string;
	refresh_token: string;
};

export const INIT_TOKENS: T_TOKENS = {
	access_token: "",
	refresh_token: "",
};

export type T_USERDATA_ALL = {
	user_id: number;
	username: string;
	first_name: string;
	last_name: string;
	tokens: T_TOKENS;
};
export const INIT_USERDATA_ALL: T_USERDATA_ALL = {
	user_id: 0,
	username: "",
	first_name: "",
	last_name: "",
	tokens: deepCopyObject(INIT_TOKENS),
};

export type T_USERDATA_STATE = {
	user_id: number;
	username: string;
	first_name: string;
	last_name: string;
};
export const INIT_USERDATA_STATE: T_USERDATA_STATE = {
	user_id: 0,
	username: "",
	first_name: "",
	last_name: "",
};

// GAME_SESSION
export type T_GAME_SESSION = {
	game_session_id: string;
	current_round: number;
};
export const INIT_GAME_SESSION_DATA: T_GAME_SESSION = {
	game_session_id: "",
	current_round: 0,
};

// REGISTER
export type T_USERINPUT_REGISTER = {
	username: string;
	password: string;
	password2: string;
	first_name: string;
	last_name: string;
};
export const INIT_USERINPUT_REGISTER: T_USERINPUT_REGISTER = {
	username: "",
	password: "",
	password2: "",
	first_name: "",
	last_name: "",
};

export type T_APIRESULT_REGISTER = {
	valid: boolean;
	user_data: T_USERDATA_STATE;
	tokens: T_TOKENS;
};
export const INIT_APIRESULT_REGISTER: T_APIRESULT_REGISTER = {
	valid: false,
	user_data: deepCopyObject(INIT_USERDATA_STATE),
	tokens: deepCopyObject(INIT_TOKENS),
};

// LOGIN
export type T_USERINPUT_LOGIN = {
	username: string;
	password: string;
};
export const INIT_USERINPUT_LOGIN: T_USERINPUT_LOGIN = {
	username: "",
	password: "",
};

export type T_APIRESULT_LOGIN = {
	valid: boolean;
	user_data: T_USERDATA_STATE;
	tokens: T_TOKENS;
};
export const INIT_APIRESULT_LOGIN: T_APIRESULT_LOGIN = {
	valid: false,
	user_data: deepCopyObject(INIT_USERDATA_STATE),
	tokens: deepCopyObject(INIT_TOKENS),
};

// VALIDATE
export type T_APIRESULT_VALIDATE_ACCESS_TOKEN = {
	valid: boolean;
	user_data: T_USERDATA_STATE;
};
export const INIT_APIRESULT_VALIDATE_ACCESS_TOKEN: T_APIRESULT_VALIDATE_ACCESS_TOKEN =
	{
		valid: false,
		user_data: deepCopyObject(INIT_USERDATA_STATE),
	};

// ALL API_RESULTS
export type T_APIRESULTS =
	| T_APIRESULT_LOGIN
	| T_APIRESULT_REGISTER
	| T_APIRESULT_VALIDATE_ACCESS_TOKEN;

// VALIDATION
export type T_AUTH_STATUS = {
	has_tokens: boolean;
	valid: boolean;
	user_data: T_USERDATA_STATE;
};
export const INIT_AUTH_STATUS: T_AUTH_STATUS = {
	has_tokens: false,
	valid: false,
	user_data: deepCopyObject(INIT_USERDATA_STATE),
};
