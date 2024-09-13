type T_LOCAL_STORAGE_KEYS = {
	access_token: string;
	refresh_token: string;
	correct_spell_info: string;
	show_info_popup: string;
};

export const LOCAL_STORAGE_KEYS: T_LOCAL_STORAGE_KEYS = {
	access_token: "ACCESS_TOKEN",
	refresh_token: "REFRESH_TOKEN",
	correct_spell_info: "CORRECT_SPELL_INFO",
	show_info_popup: "SHOW_INFO_POPUP",
};

// React-Query
export const QUERY_KEYS = {
	USER_DATA: "user_data",
	GAME_SESSION_INFO: "game_session_info",
	CORRECT_SPELL_INFO: "correct_spell_info",
	SPELL_LIST: "spell_list",
};

export const USER_ROLES = {
	USER: "U",
	ADMIN: "A",
};

export const LIMITS = {
	CATEGORY: 5,
	SPELL: 3,
};

export const APP_VERSION: string = "0.6b";
