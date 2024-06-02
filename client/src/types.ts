import { deepCopyObject } from "./utils/methods";

export enum E_CATEGORIES {
	SCHOOL = 0,
	LEVEL,
	CASTING,
	RANGE,
	TARGET,
	COMPONENTS,
	DURATION,
	CLASS,
	EFFECTS,
}

export enum E_SCHOOL_VALUES {
	ABJURATION = 0,
	CONJURATION,
	DIVINATION,
	DUNAMANCY,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION,
}

export enum E_LEVEL_VALUES {
	FIRST = 0,
	SECOND,
	THIRD,
	FOURTH,
	FIFTH,
	SIXTH,
	SEVENTH,
	EIGTH,
	NINTH,
	CANTRIP,
}

export enum E_CASTING_TIME_VALUES {
	ONE_ACTION = 0,
	ONE_REACTION,
	BONUS_ACTION,
	ONE_MINUTE,
	TEN_MINUTES,
	ONE_HOUR,
	ONE_PLUS_HOUR,
}

export enum E_RANGE_VALUES {
	TOUCH = 0,
	SELF,
	FIVE_FEET,
	TEN_FEET,
	THIRTY_FEET,
	SIXTY_FEET,
	ONE_HUNDRED_TWENTY_FEET,
	ONE_HUNDRED_TWENTY_PLUS_FEET,
}

export enum E_TARGET_VALUES {
	NULL = 0,
	CREATURE,
	OBJECT,
	AREA,
	POINT,
	UNNOCUPIED_SPACE,
}

export enum E_COMPONENT_VALUES {
	V = 0,
	S,
	M,
}

export enum E_DURATION_VALUES {
	INSTANTANEOUS = 0,
	ONE_ROUND,
	ONE_MINUTE,
	TEN_MINUTES,
	ONE_HOUR,
	EIGHT_HOURS,
	EIGHT_PLUS_HOURS,
	UNTIL_DISPELLED,
}

export const enum E_CLASS_VALUES {
	ARTIFICER = 0,
	BARD,
	CLERIC,
	DRUID,
	PALADIN,
	RANGER,
	SORCERER,
	WARLOCK,
	WIZARD,
}

export enum E_EFFECT_VALUES {
	Damage = 0,
	Healing,
	HP,
	AC,
	AoE,
	Condition,
	Buff,
	Debuff,
	Ability_Score,
	Check,
	Saving_Throw,
	Advantage,
	Disadvantage,
	Resistance,
	Terrain,
	Living,
	Non_Living,
	Utility,
	Location,
	Movement,
	Find,
	Hide,
	Send,
	Control,
	Create,
	Summon,
	Ask,
	Creature_Type,
	Options,
	Change,
	Choose,
	Multiple,
	Upcast,
	Leveling,
	Melee,
	Weapon,
	Acid,
	Bludgeoning,
	Cold,
	Fire,
	Force,
	Lightning,
	Necrotic,
	Piercing,
	Poison,
	Psychic,
	Radiant,
	Slashing,
	Thunder,
}

export type T_ALL_POSSIBLE_CATEGORIES_INFO = {
	SCHOOL: T_SINGLE_CATEGORY_POSSIBILITIES;
	LEVEL: T_SINGLE_CATEGORY_POSSIBILITIES;
	CASTING_TIME: T_SINGLE_CATEGORY_POSSIBILITIES;
	RANGE: T_SINGLE_CATEGORY_POSSIBILITIES;
	TARGET: T_SINGLE_CATEGORY_POSSIBILITIES;
	COMPONENTS: T_SINGLE_CATEGORY_POSSIBILITIES;
	DURATION: T_SINGLE_CATEGORY_POSSIBILITIES;
	CLASS: T_SINGLE_CATEGORY_POSSIBILITIES;
	EFFECTS: T_SINGLE_CATEGORY_POSSIBILITIES;
};

export type T_SINGLE_CATEGORY_POSSIBILITIES = {
	name: string;
	values: string[];
	has_multi: boolean;
	has_modifiers: boolean;
};

export type T_CATEGORY_GUESS_STATE = string | string[] | [string, boolean];
export type T_SPELL_INFO = Map<string, T_CATEGORY_GUESS_STATE>;

// USERDATA
export type T_USERDATA_ACCOUNT = {
	username: string;
};

export const INIT_USERDATA_ACCOUNT: T_USERDATA_ACCOUNT = {
	username: "",
};

export type T_USERDATA_PERSONAL = {
	first_name: string;
	last_name: string;
};

export const INIT_USERDATA_PERSONAL: T_USERDATA_PERSONAL = {
	first_name: "",
	last_name: "",
};

export type T_USERDATA_TOKENS = {
	access_token: string;
	refresh_token: string;
};

export const INIT_USERDATA_TOKENS: T_USERDATA_TOKENS = {
	access_token: "",
	refresh_token: "",
};

export type T_USERDATA_ALL = {
	user_id: number;
	user_data_account: T_USERDATA_ACCOUNT;
	user_data_personal: T_USERDATA_PERSONAL;
	user_data_tokens: T_USERDATA_TOKENS;
};

export const INIT_USERDATA_ALL: T_USERDATA_ALL = {
	user_id: 0,
	user_data_account: deepCopyObject(INIT_USERDATA_ACCOUNT),
	user_data_personal: deepCopyObject(INIT_USERDATA_PERSONAL),
	user_data_tokens: deepCopyObject(INIT_USERDATA_TOKENS),
};

export type T_USERDATA_STATE = {
	user_id: number;
	user_data_account: T_USERDATA_ACCOUNT;
	user_data_personal: T_USERDATA_PERSONAL;
};

export const INIT_USERDATA_STATE: T_USERDATA_STATE = {
	user_id: 0,
	user_data_account: deepCopyObject(INIT_USERDATA_ACCOUNT),
	user_data_personal: deepCopyObject(INIT_USERDATA_PERSONAL),
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
	user_id: number;
	user_data_account: T_USERDATA_ACCOUNT;
	user_data_personal: T_USERDATA_PERSONAL;
	user_data_tokens: T_USERDATA_TOKENS;
};

export const INIT_APIRESULT_REGISTER: T_APIRESULT_REGISTER = {
	valid: false,
	user_id: 0,
	user_data_account: deepCopyObject(INIT_USERDATA_ACCOUNT),
	user_data_personal: deepCopyObject(INIT_USERDATA_PERSONAL),
	user_data_tokens: deepCopyObject(INIT_USERDATA_TOKENS),
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
	user_id: number;
	user_data_account: T_USERDATA_ACCOUNT;
	user_data_personal: T_USERDATA_PERSONAL;
	user_data_tokens: T_USERDATA_TOKENS;
};

export const INIT_APIRESULT_LOGIN: T_APIRESULT_LOGIN = {
	valid: false,
	user_id: 0,
	user_data_account: deepCopyObject(INIT_USERDATA_ACCOUNT),
	user_data_personal: deepCopyObject(INIT_USERDATA_PERSONAL),
	user_data_tokens: deepCopyObject(INIT_USERDATA_TOKENS),
};

// VALIDATE
export type T_APIRESULT_VALIDATE_SESSION = {
	valid: boolean;
	user_id: number;
	user_data_account: T_USERDATA_ACCOUNT;
	user_data_personal: T_USERDATA_PERSONAL;
};

export const INIT_APIRESULT_VALIDATE_SESSION: T_APIRESULT_VALIDATE_SESSION = {
	valid: false,
	user_id: 0,
	user_data_account: deepCopyObject(INIT_USERDATA_ACCOUNT),
	user_data_personal: deepCopyObject(INIT_USERDATA_PERSONAL),
};

export type T_QUERY_KEYS = {
	userData: string;
};
