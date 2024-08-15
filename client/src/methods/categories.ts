import { T_GUESS_CATEGORIES_MAP } from "./guesses";

// TYPES
export type T_CATEGORIES_INFO = {
	CATEGORY_KEYS: string[];
	CATEGORY_INFO_MAP: T_CATEGORY_INFO[];
};

export enum E_CATEGORY_COMPONENT_TYPE {
	SINGLE_TEXT = 0,
	MULTI_TEXT,
	COMPONENTS,
	LEVEL,
}

export type T_CATEGORY_INFO = {
	name: string;
	value_id_map: Map<string, number>;
	values: string[];
	component_type: E_CATEGORY_COMPONENT_TYPE;
	has_modifiers: boolean;
};

export type T_CATEGORY_INFO_JSON = {
	name: string;
	values: string[];
	component_type: E_CATEGORY_COMPONENT_TYPE;
	has_modifiers: boolean;
}[];

// FUNCTIONS
export function generateCategoryInfoFromJSON(
	categoryInfoJson: T_CATEGORY_INFO_JSON,
): T_CATEGORY_INFO[] {
	const info: T_CATEGORY_INFO[] = [];

	for (const {
		name,
		component_type,
		has_modifiers,
		values,
	} of categoryInfoJson) {
		info.push({
			name,
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

export function generateGuessCategoriesMapFromJSON(
	categoryInfoJson: T_CATEGORY_INFO_JSON,
): T_GUESS_CATEGORIES_MAP {
	const map: Map<string, any> = new Map();

	for (const { name, component_type } of categoryInfoJson) {
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

		map.set(name, value);
	}

	return map;
}
