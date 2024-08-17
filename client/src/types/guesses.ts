import { I_GUESS_CELL_STATE } from "../components/Game/children/GuessBox/children/GuessCell/GuessCell";

export type T_GUESS_STATES_STRINGS =
	| string
	| string[]
	| T_GUESS_STATES_STRINGS_LEVEL;

export type T_GUESS_STATES_IDS = number | number[] | T_GUESS_STATES_IDS_LEVEL;

export type T_GUESSES_AS_STRINGS = Map<string, T_GUESS_STATES_STRINGS>;
export type T_GUESSES_AS_IDS = Map<string, T_GUESS_STATES_IDS>;

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
export type T_GUESS_STATES_STRINGS_LEVEL = {
	level: string;
	is_ritual: boolean;
};

export type T_GUESS_CELLS_STATE = Map<string, I_GUESS_CELL_STATE>;

export enum E_RESULT_OPTIONS {
	UNINITIALIZED = -1,
	INCORRECT = 0,
	SLIGHTLY_CORRECT = 1,
	CORRECT = 2,
}
