import { deepCopyObject } from "../utils/methods";
import { type T_GAME_SESSION } from "../types";

export type T_GUESS_STATES_STRINGS =
	| string
	| string[]
	| T_GUESS_CATEGORIES_LEVEL;

export type T_GUESS_STATES_IDS =
	| number
	| number[]
	| T_GUESS_CATEGORIES_LEVEL;

export type T_GUESSES_AS_STRINGS = Map<string, T_GUESS_STATES_STRINGS>;
export type T_GUESSES_AS_IDS = Map<string, T_GUESS_STATES_IDS>

export type T_APIRESULT_GET_PAST_GUESSES = {
	game_session: {
		game_session_id: string;
		current_round: number;
	};
	guesses: T_GUESS_AND_RESULT[];
};

export type T_GUESS_AND_RESULT = {
	round: number;
	school: T_GUESS_AND_RESULT_VALUE;
	level: T_GUESS_AND_RESULT_VALUE;
	casting_time: T_GUESS_AND_RESULT_VALUE;
	range: T_GUESS_AND_RESULT_VALUE;
	target: T_GUESS_AND_RESULT_VALUE;
	duration: T_GUESS_AND_RESULT_VALUE;
	components: T_GUESS_AND_RESULT_VALUE;
	class: T_GUESS_AND_RESULT_VALUE;
	effects: T_GUESS_AND_RESULT_VALUE;
};
export type T_GUESS_AND_RESULT_VALUE = {
	value: T_GUESS_STATES_IDS;
	result: number;
};

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
