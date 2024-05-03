export enum E_CATEGORIES {
	School = 1,
	Level,
	Casting,
	Range,
	Target,
	Components,
	Duration,
	Class,
	Effects,
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
	abjuration = 1,
	conjuration,
	divination,
	dunamancy,
	enchantment,
	evocation,
	illusion,
	necromancy,
	transmutation,
}

export const SCHOOL_NAMES: string[] = [
	"null",
	"Abjuration",
	"conjuration",
	"divination",
	"dunamancy",
	"enchantment",
	"evocation",
	"illusion",
	"necromancy",
	"transmutation",
];

export enum E_LEVEL_VALUES {
	first = 1,
	second,
	third,
	fourth,
	fifth,
	sixth,
	seventh,
	eigth,
	ninth,
	cantrip,
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
