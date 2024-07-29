import { deepCopyObject } from "../utils/methods";
import { type T_GAME_SESSION } from "../types";

export type T_CATEGORY_GUESS_STATE = string | string[] | [string, boolean];
export type T_ALL_CURRENT_GUESS_INFO = Map<string, T_CATEGORY_GUESS_STATE>;

export type T_GUESS_CATEGORIES = {
	school: number;
	level: { level: number; is_ritual: boolean };
	casting_time: number;
	range: number;
	target: number;
	duration: number;
	components: number[];
	class: number[];
	effects: number[];
};
export const INIT_GUESS_CATEGORIES: T_GUESS_CATEGORIES = {
	school: -1,
	level: { level: -1, is_ritual: false },
	casting_time: -1,
	range: -1,
	target: -1,
	duration: -1,
	components: [],
	class: [],
	effects: [],
};

export enum E_GUESS_RESULT_OPTIONS {
	INCORRECT = 0,
	SLIGHTLY_CORRECT,
	CORRECT,
}
export type T_GUESS_RESULTS = {
	school: number;
	level: number;
	casting_time: number;
	range: number;
	target: number;
	duration: number;
	components: number;
	class: number;
	effects: number;
};
export const INIT_GUESS_RESULTS: T_GUESS_RESULTS = {
	school: 0,
	level: 0,
	casting_time: 0,
	range: 0,
	target: 0,
	duration: 0,
	components: 0,
	class: 0,
	effects: 0,
};

export type T_GUESS_CATEGORIES_MAP = Map<
	string,
	| T_GUESS_CATEGORIES_SINGLE_TEXT
	| T_GUESS_CATEGORIES_MULTI_TEXT
	| T_GUESS_CATEGORIES_COMPONENTS
	| T_GUESS_CATEGORIES_LEVEL
>;
export type T_GUESS_CATEGORIES_SINGLE_TEXT = number;
export type T_GUESS_CATEGORIES_MULTI_TEXT = number[];
export type T_GUESS_CATEGORIES_COMPONENTS = number[];
export type T_GUESS_CATEGORIES_LEVEL = { level: number; is_ritual: boolean };

export type T_PAST_GUESSES = {
	categories: T_GUESS_CATEGORIES;
	results: T_GUESS_RESULTS;
};
export const INIT_PAST_GUESSES: T_PAST_GUESSES = {
	categories: deepCopyObject(INIT_GUESS_CATEGORIES),
	results: deepCopyObject(INIT_GUESS_RESULTS),
};

export type T_GUESS_ALL = {
	game_session_id: string;
	round: number;
	categories: T_GUESS_CATEGORIES;
	results: T_GUESS_RESULTS;
};
export const INIT_GUESS_ALL: T_GUESS_ALL = {
	game_session_id: "",
	round: 0,
	categories: deepCopyObject(INIT_GUESS_CATEGORIES),
	results: deepCopyObject(INIT_GUESS_RESULTS),
};

export type T_APIRESULT_GET_GUESSES = {
	game_session_id: string;
	guesses: T_PAST_GUESSES[];
};

export type T_APIREQUEST_MAKE_GUESS = T_GAME_SESSION & T_GUESS_CATEGORIES;
export const INIT_APIREQUEST_MAKE_GUESS: T_APIREQUEST_MAKE_GUESS = {
	game_session_id: "",
	current_round: 0,
	school: 0,
	level: {
		level: 0,
		is_ritual: false,
	},
	casting_time: 0,
	range: 0,
	target: 0,
	duration: 0,
	components: [0],
	class: [0],
	effects: [0],
};
