import { E_CATEGORY_COMPONENT_TYPE, T_CATEGORY_INFO } from "./categories";

export type T_GUESS_CATEGORIES_STATES_DISPLAY = string | string[];
export type T_GUESS_CATEGORIES_STATES_IDS = number | number[];

export type T_GUESS_CATEGORIES_IDS_MAP = Map<
	string,
	T_GUESS_CATEGORIES_STATES_IDS
>;

export enum E_GUESS_CATEGORY_RESULTS {
	UNINITIALIZED = -1,
	INCORRECT = 0,
	SLIGHTLY_CORRECT = 1,
	CORRECT = 2,
}

export type T_PAST_GUESS_CATEGORIES_MAP = Map<string, T_PAST_GUESS_CATEGORY>;

export type T_PAST_GUESS_CATEGORY = {
	value: T_GUESS_CATEGORIES_STATES_IDS;
	result: E_GUESS_CATEGORY_RESULTS;
};
export const INIT_PAST_GUESS_CATEGORY: T_PAST_GUESS_CATEGORY = {
	value: -1,
	result: E_GUESS_CATEGORY_RESULTS.UNINITIALIZED,
};

export type T_PAST_GUESS_SPELLS = number[];

export function translateIdsToDisplay(
	id: T_GUESS_CATEGORIES_STATES_IDS,
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
			if (Array.isArray(id)) {
				const display: T_GUESS_CATEGORIES_STATES_DISPLAY = [
					categoryInfo.values[id[0]],
				];
				display.push(id[1] == 1 ? "true" : "false");
				return display;
			}
	}

	return [];
}
