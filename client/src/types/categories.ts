import { type T_GUESSES_AS_IDS } from "./guesses";

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
	LEVEL,
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
	categoryInfoJson: T_CATEGORY_INFO_SEED_JSON,
): T_GUESSES_AS_IDS {
	const map: T_GUESSES_AS_IDS = new Map();

	for (const { id, component_type } of categoryInfoJson) {
		let value;

		switch (component_type) {
			case E_CATEGORY_COMPONENT_TYPE.SINGLE_TEXT:
				value = -1;
				break;
			case E_CATEGORY_COMPONENT_TYPE.MULTI_TEXT:
			case E_CATEGORY_COMPONENT_TYPE.COMPONENTS:
				value = [];
				break;
			case E_CATEGORY_COMPONENT_TYPE.LEVEL:
				value = { level: -1, is_ritual: false };
				break;
		}

		map.set(id, value);
	}

	return map;
}
