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

// USER
export type T_ALL_USER_DATA = {
	user_id: number;
	username: string;
	first_name: string;
	last_name: string;
	session_key: string;
};

export const initAllUserData: T_ALL_USER_DATA = {
	user_id: -1,
	session_key: "",
	username: "",
	first_name: "",
	last_name: "",
};

export type T_USER_SESSION_DATA = {
	user_id: number;
	session_key: string;
};

export const initUserSessionData: T_USER_SESSION_DATA = {
	user_id: 0,
	session_key: "uninitialized_session_key",
};

export type T_UserInput_Register = {
	username: string;
	password: string;
	password2: string;
	first_name: string;
	last_name: string;
};

export const initUserInputRegister: T_UserInput_Register = {
	username: "",
	password: "",
	password2: "",
	first_name: "",
	last_name: "",
};

// Result from Requests/attemptRegister
export type T_RegisterResult = {
	valid: boolean;
	user_data: T_ALL_USER_DATA;
	session_key: string;
	error: boolean;
};

export const initRegisterResult: T_RegisterResult = {
	valid: false,
	error: false,
	user_data: { ...initAllUserData },
	session_key: "",
};

export type T_UserInput_Login = {
	username: string;
	password: string;
};

export const initUserInputLogin: T_UserInput_Login = {
	username: "",
	password: "",
};

// Result from Requests/attemptLogin
export type T_LoginResult = {
	valid: boolean;
	user_data: T_ALL_USER_DATA;
	session_key: string;
	error: boolean;
};

export const initLoginResult: T_LoginResult = {
	valid: false,
	error: false,
	user_data: { ...initAllUserData },
	session_key: "",
};

export type T_APIUserDataResponse = {
	valid: boolean;
	user_data: T_ALL_USER_DATA;
	session_key: string;
};

export const initApiUserDataResponse: T_APIUserDataResponse = {
	valid: false,
	user_data: { ...initAllUserData },
	session_key: "",
};

export type T_VALIDATE_SESSION_RESULT = {
	valid: boolean;
	user_data: T_ALL_USER_DATA;
};

export const initValidateSessionResult: T_VALIDATE_SESSION_RESULT = {
	valid: false,
	user_data: deepCopyObject(initAllUserData),
};
