import { T_UserSessionData, initUserSessionData } from "../types";

export function checkForSessionInfo(): boolean {
	return !(
		localStorage.getItem("session_key") === null ||
		localStorage.getItem("session_key") === ""
	);
}

export function getSessionInfoFromStorage(): T_UserSessionData {
	const sessionInfo: T_UserSessionData = { ...initUserSessionData };

	try {
		sessionInfo.user_id = parseInt(localStorage.getItem("user_id") || "-1");
		sessionInfo.session_key = localStorage.getItem("session_key") || "";
		return sessionInfo;
	} catch (err: any) {
		throw new Error(err);
	}
}

export function sendToLocalStorage(sessionInfo: T_UserSessionData) {
	localStorage.setItem("user_id", String(sessionInfo.user_id));
	localStorage.setItem("session_key", sessionInfo.session_key);

	console.log("Sent to localStorage: ");
	console.log(`user_id: ${localStorage.getItem("user_id")}`);
	console.log(`session_key: ${localStorage.getItem("session_key")}`);
}
