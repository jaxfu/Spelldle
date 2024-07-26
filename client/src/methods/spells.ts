export type T_SPELL_INFO_NAMESPACE ={
	VALUE_MAP: T_CATEGORY_VALUE_MAP
}

export const SPELL_INFO: T_SPELL_INFO_NAMESPACE = {
	VALUE_MAP:
}

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