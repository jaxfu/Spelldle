import type { T_GUESS_CATEGORIES_IDS_MAP } from "./guesses";

export type T_Spell = {
	name: string;
	spell_id: string;
	categories: T_GUESS_CATEGORIES_IDS_MAP;
};
