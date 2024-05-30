import {
	T_LoginResult,
	T_RegisterResult,
	T_ALL_USER_DATA,
	initAllUserData,
	T_VALIDATE_SESSION_RESULT,
} from "../types";

export function getUserDataFromAPIResponse(
	response: T_LoginResult | T_RegisterResult | T_VALIDATE_SESSION_RESULT
): T_ALL_USER_DATA {
	const userData: T_ALL_USER_DATA = { ...initAllUserData };

	// Basic
	userData.user_id = response.user_data.user_id;
	userData.username = response.user_data.username;
	userData.first_name = response.user_data.first_name;
	userData.last_name = response.user_data.last_name;
	userData.session_key = response.session_key;

	return userData;
}
