import { T_PAST_GUESS_CATEGORIES_MAP } from "./guesses";

export type T_GAME_SESSION = {
	guesses: {
		categories: T_PAST_GUESS_CATEGORIES_MAP[];
		spells: number[];
		correct: boolean;
	};
};
