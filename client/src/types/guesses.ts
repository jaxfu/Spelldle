import { deepCopyObject } from "../utils/methods";
import { type T_GAME_SESSION } from "../types";

export type T_GUESS_STATES_STRINGS =
	| string
	| string[]
	| T_GUESS_STATES_IDS_LEVEL;

export type T_GUESS_STATES_IDS = number | number[] | T_GUESS_STATES_IDS_LEVEL;

export type T_GUESSES_AS_STRINGS = Map<string, T_GUESS_STATES_STRINGS>;
export type T_GUESSES_AS_IDS = Map<string, T_GUESS_STATES_IDS>;

export enum E_RESULT_OPTIONS {
	INCORRECT = 0,
	SLIGHTLY_CORRECT,
	CORRECT,
}

export type T_APIRESPONSE_GET_PAST_GUESSES = {
	game_session: {
		game_session_id: string;
		current_round: number;
	};
	guesses: T_PAST_GUESS[];
};

export type T_PAST_GUESS = Map<
	string,
	{
		value: T_GUESSES_AS_IDS;
		result: number;
	}
>;

export type T_GUESS_STATES_IDS_LEVEL = { level: number; is_ritual: boolean };
