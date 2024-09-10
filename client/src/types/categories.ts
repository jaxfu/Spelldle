import { type T_GUESS_CATEGORIES_IDS_MAP } from "./guesses";

// TYPES
export type T_CATEGORY_INFO = {
	id: string;
	display_name: string;
	value_id_map: Map<string, number>;
	values: string[];
	component_type: E_CATEGORY_COMPONENT_TYPE;
	has_modifiers: boolean;
};

export type T_CATEGORY_INFO_SEED_JSON = {
	id: string;
	display_name: string;
	values: string[];
	component_type: E_CATEGORY_COMPONENT_TYPE;
	has_modifiers: boolean;
}[];

export enum E_CATEGORY_COMPONENT_TYPE {
	SINGLE_TEXT = 0,
	MULTI_TEXT,
	COMPONENTS,
	SINGLE_TEXT_WITH_TOGGLE,
}

// FUNCTIONS
export function generateCategoryInfoFromSeedJSON(
	categoryInfoJson: T_CATEGORY_INFO_SEED_JSON,
): T_CATEGORY_INFO[] {
	const info: T_CATEGORY_INFO[] = [];

	for (const {
		id,
		display_name,
		component_type,
		has_modifiers,
		values,
	} of categoryInfoJson) {
		info.push({
			id,
			display_name,
			component_type,
			has_modifiers,
			values,
			value_id_map: generateValuesMapFromValues(values),
		});
	}

	return info;
}
function generateValuesMapFromValues(arr: string[]): Map<string, number> {
	const map = new Map();
	arr.forEach((item: string, index: number) => {
		map.set(item.toLowerCase(), index);
	});
	return map;
}

export function generateGuessesStateFromJSON(
	categoryInfoJson: T_CATEGORY_INFO_SEED_JSON | undefined,
): T_GUESS_CATEGORIES_IDS_MAP {
	const map: T_GUESS_CATEGORIES_IDS_MAP = new Map();

	if (categoryInfoJson !== undefined) {
		for (const { id, component_type } of categoryInfoJson) {
			switch (component_type) {
				case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
					map.set(id, -1);
					break;
				case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
				case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
					map.set(id, []);
					break;
				case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT_WITH_TOGGLE:
					map.set(id, [0, 0]);
			}
		}
	}

	return map;
}
