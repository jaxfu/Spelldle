import CATEGORY_INFO from "../data/CATEGORY_INFO.json";

// TYPES
export type T_SPELLS_INFO = {
	CATEGORY_KEYS: string[];
	CATEGORY_INFO_MAP: T_CATEGORY_INFO_ALL;
};

export enum E_CATEGORY_COMPONENT_TYPE {
	SINGLE_TEXT = 0,
	MULTI_TEXT,
	COMPONENTS,
	LEVEL,
}

export type T_CATEGORY_INFO_ALL = Map<string, T_CATEGORY_INFO>;
export type T_CATEGORY_INFO = {
	name: string;
	values: string[];
	id_map: Map<string, number>;
	component_type: E_CATEGORY_COMPONENT_TYPE;
	has_modifiers: boolean;
};

export type T_CATEGORY_VALUE_MAP = {
	SCHOOL: Map<string, number>;
	LEVEL: Map<string, number>;
	CASTING_TIME: Map<string, number>;
	RANGE: Map<string, number>;
	TARGET: Map<string, number>;
	COMPONENTS: Map<string, number>;
	DURATION: Map<string, number>;
	CLASS: Map<string, number>;
	EFFECTS: Map<string, number>;
};

// FUNCTIONS
function generateAndSetAllIDMapsFromJSON(categoryInfoJson: T_CATEGORY_INFO[]) {
	for (const category of categoryInfoJson) {
		category.id_map = generateIdMapFromValues(category.values);
	}
}

function generateIdMapFromValues(arr: string[]) {
	const map = new Map();
	arr.forEach((item: string, index: number) => {
		map.set(item, index);
	});
	return map;
}

function generateCategoryInfoAllMapFromJSON(
	categoryInfoJson: T_CATEGORY_INFO[],
): T_CATEGORY_INFO_ALL {
	const map: T_CATEGORY_INFO_ALL = new Map();

	for (const category of categoryInfoJson) {
		map.set(category.name, category);
	}

	return map;
}

export function generateSpellsInfoFromJSON(
	categoryInfoJson: T_CATEGORY_INFO[],
): T_SPELLS_INFO {
	// generate and set id maps
	generateAndSetAllIDMapsFromJSON(categoryInfoJson);

	return {
		CATEGORY_KEYS: categoryInfoJson.map((category) => category.name),
		CATEGORY_INFO_MAP: generateCategoryInfoAllMapFromJSON(categoryInfoJson),
	};
}
