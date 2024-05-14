export enum E_CATEGORIES {
	SCHOOL = 0,
	LEVEL,
	CASTING,
	RANGE,
	TARGET,
	COMPONENTS,
	DURATION,
	CLASS,
	EFFECTS,
}

export enum E_SCHOOL_VALUES {
	ABJURATION = 0,
	CONJURATION,
	DIVINATION,
	DUNAMANCY,
	ENCHANTMENT,
	EVOCATION,
	ILLUSION,
	NECROMANCY,
	TRANSMUTATION,
}

export enum E_LEVEL_VALUES {
	FIRST = 0,
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

export enum E_CASTING_VALUES {
	ONE_ACTION = 0,
	ONE_REACTION,
	BONUS_ACTION,
	ONE_MINUTE,
	TEN_MINUTES,
	ONE_HOUR,
	ONE_PLUS_HOUR,
}

export enum E_RANGE_VALUES {
	TOUCH = 0,
	SELF,
	FIVE_FEET,
	TEN_FEET,
	THIRTY_FEET,
	SIXTY_FEET,
	ONE_HUNDRED_TWENTY_FEET,
	ONE_HUNDRED_TWENTY_PLUS_FEET,
}

export enum E_TARGET_VALUES {
	NULL = 0,
	CREATURE,
	OBJECT,
	AREA,
	POINT,
	UNNOCUPIED_SPACE,
}

export enum E_COMPONENT_VALUES {
	V = 0,
	S,
	M,
}

export enum E_DURATION_VALUES {
	INSTANTANEOUS = 0,
	ONE_ROUND,
	ONE_MINUTE,
	TEN_MINUTES,
	ONE_HOUR,
	EIGHT_HOURS,
	EIGHT_PLUS_HOURS,
	UNTIL_DISPELLED,
}

export const enum E_CLASS_VALUES {
	ARTIFICER = 0,
	BARD,
	CLERIC,
	DRUID,
	PALADIN,
	RANGER,
	SORCERER,
	WARLOCK,
	WIZARD,
}

export enum E_EFFECT_VALUES {
	Damage = 0,
	Healing,
	HP,
	AC,
	AoE,
	Condition,
	Buff,
	Debuff,
	Ability_Score,
	Check,
	Saving_Throw,
	Advantage,
	Disadvantage,
	Resistance,
	Terrain,
	Living,
	Non_Living,
	Utility,
	Location,
	Movement,
	Find,
	Hide,
	Send,
	Control,
	Create,
	Summon,
	Ask,
	Creature_Type,
	Options,
	Change,
	Choose,
	Multiple,
	Upcast,
	Leveling,
	Melee,
	Weapon,
	Acid,
	Bludgeoning,
	Cold,
	Fire,
	Force,
	Lightning,
	Necrotic,
	Piercing,
	Poison,
	Psychic,
	Radiant,
	Slashing,
	Thunder,
}

export type T_CATEGORY_INFO = {
	SCHOOL: T_CATEGORY;
	LEVEL: T_CATEGORY;
	CASTING: T_CATEGORY;
	RANGE: T_CATEGORY;
	TARGET: T_CATEGORY;
	COMPONENTS: T_CATEGORY;
	DURATION: T_CATEGORY;
	CLASS: T_CATEGORY;
	EFFECTS: T_CATEGORY;
};

export type T_CATEGORY = {
	name: string;
	values: string[];
};
