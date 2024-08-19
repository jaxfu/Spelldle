import { I_GUESS_CELL_STATE } from "../components/Game/children/GuessBox/children/GuessCell/GuessCell";
import { E_CATEGORY_COMPONENT_TYPE, T_CATEGORY_INFO } from "./categories";

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

export type T_PAST_GUESS = Map<string, T_PAST_GUESS_CATEGORY>;

export type T_PAST_GUESS_CATEGORY = {
	value: T_GUESS_STATES_IDS;
	result: E_RESULT_OPTIONS;
};

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

export function translateValuesToStrings(
	id: T_GUESS_STATES_IDS,
	categoryInfo: T_CATEGORY_INFO,
): string[] {
	switch (categoryInfo.component_type) {
		case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
			return [categoryInfo.values[id as unknown as number]];
		case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
		case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
			if (Array.isArray(id)) {
				return id.map((v: number) => {
					return categoryInfo.values[v];
				});
			}
			break;
		case E_CATEGORY_COMPONENT_TYPE.LEVEL:
			const v = {
				...(id as unknown as T_GUESS_STATES_IDS_LEVEL),
			};
			return [categoryInfo.values[v.level], v.is_ritual.toString()];
	}

	return [];
}

export function translateIdsToValues(
	id: T_GUESS_STATES_IDS,
	categoryInfo: T_CATEGORY_INFO,
): T_GUESS_STATES_STRINGS {
	switch (categoryInfo.component_type) {
		case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
			return categoryInfo.values[id as unknown as number];
		case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
		case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
			if (Array.isArray(id)) {
				return id.map((v: number) => {
					return categoryInfo.values[v];
				});
			}
			break;
		case E_CATEGORY_COMPONENT_TYPE.LEVEL:
			const v = {
				...(id as unknown as T_GUESS_STATES_IDS_LEVEL),
			};
			return { level: categoryInfo.values[v.level], is_ritual: v.is_ritual };
	}

	return "";
}
