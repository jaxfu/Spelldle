export enum E_CATEGORIES {
	SCHOOL = 1,
	LEVEL,
	CASTING,
	RANGE,
	TARGET,
	COMPONENTS,
	DURATION,
	CLASS,
	EFFECTS,
}

export const CATEGORY_NAMES: string[] = [
	"null",
	"School",
	"Level",
	"Casting",
	"Range",
	"Target",
	"Components",
	"Duration",
	"Class",
	"Effects",
];

export enum E_SCHOOL_VALUES {
	ABJURATION = 1,
	CONJURATION,
	DIVINATION,
	DUNAMANCY,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION,
}

export const SCHOOL_NAMES: string[] = [
	"null",
	"Abjuration",
	"Conjuration",
	"Divination",
	"Dunamancy",
	"Enchantment",
	"Evocation",
	"Illusion",
	"Necromancy",
	"Transmutation",
];

export enum E_LEVEL_VALUES {
	FIRST = 1,
	SECOND,
	THIRD,
	FOURTH,
	FIFTH,
	SIXTH,
	SEVENTH,
	EIGTH,
	NINTH,
	CANTRIP,
}

export const LEVEL_NAMES = [
	"null",
	"1st",
	"2nd",
	"3rd",
	"4th",
	"5th",
	"6th",
	"7th",
	"8th",
	"9th",
	"Cantrip",
];

export enum E_COMPONENT_VALUES {
	V = 1,
	S,
	M,
}

export const COMPONENT_NAMES: string[] = ["null", "V", "S", "M"];
