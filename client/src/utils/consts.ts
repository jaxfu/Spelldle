type T_KEYS_TOKENS = {
	access_token: string;
	refresh_token: string;
};

export const LOCAL_STORAGE_TOKENS_KEYS: T_KEYS_TOKENS = {
	access_token: "ACCESS_TOKEN",
	refresh_token: "REFRESH_TOKEN",
};

// React-Query
export const QUERY_KEYS = {
	USER_DATA: "user_data",
	GAME_SESSION_INFO: "game_session_info",
};

export const USER_ROLES = {
	USER: "U",
	ADMIN: "A"
}
