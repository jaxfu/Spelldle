type T_KEYS_TOKENS = {
	access_token: string;
	refresh_token: string;
	correct_spell_info: string;
};

export const LOCAL_STORAGE_TOKENS_KEYS: T_KEYS_TOKENS = {
	access_token: "ACCESS_TOKEN",
	refresh_token: "REFRESH_TOKEN",
	correct_spell_info: "CORRECT_SPELL_INFO",
};

// React-Query
export const QUERY_KEYS = {
	USER_DATA: "user_data",
	GAME_SESSION_INFO: "game_session_info",
	CORRECT_SPELL_INFO: "correct_spell_info",
};

export const USER_ROLES = {
	USER: "U",
	ADMIN: "A",
};

export const LIMITS = {
	CATEGORY: 5,
	SPELL: 3,
};
