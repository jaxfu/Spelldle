type T_KEYS_TOKENS = {
	access_token: string;
	refresh_token: string;
};

export const LOCAL_STORAGE_TOKENS_KEYS: T_KEYS_TOKENS = {
	access_token: "ACCESS_TOKEN",
	refresh_token: "REFRESH_TOKEN",
};

// React-Query
type T_KEYS_QUERY = {
	userData: string;
	gameSessionInfo: string;
};

export const QUERY_KEYS: T_KEYS_QUERY = {
	userData: "user_data",
	gameSessionInfo: "game_session_info",
};
