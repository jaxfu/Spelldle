import {
	T_APIRESULT_LOGIN,
	T_APIRESULT_REGISTER,
	T_USERDATA_ACCOUNT,
	INIT_USERDATA_ACCOUNT,
	T_APIRESULT_VALIDATE_SESSION as T_APIRESULT_VALIDATE_SESSION,
} from "../types";

export function getUserDataFromAPIResponse(
	response:
		| T_APIRESULT_LOGIN
		| T_APIRESULT_REGISTER
		| T_APIRESULT_VALIDATE_SESSION
): T_USERDATA_ACCOUNT {
	const userData: T_USERDATA_ACCOUNT = { ...INIT_USERDATA_ACCOUNT };

	// Basic
	userData.user_id = response.user_data.user_id;
	userData.username = response.user_data.username;
	userData.first_name = response.user_data.first_name;
	userData.last_name = response.user_data.last_name;
	userData.session_key = response.session_key;

	return userData;
}
