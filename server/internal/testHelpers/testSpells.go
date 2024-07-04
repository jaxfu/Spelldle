package testHelpers

import "spelldle.com/server/shared/types"

var TestSpell = types.SpellAllInfo{
	Name: "Fireball",
	SpellCategories: types.SpellCategories{
		Components: []int{1, 2},
		Class:      []int{3, 4, 5},
		Effects:    []int{6, 7, 8, 9},
		Level: types.SpellLevel{
			Level:    1,
			IsRitual: false,
		},
		School:      0,
		CastingTime: 1,
		Range:       2,
		Target:      3,
		Duration:    4,
	},
	SpellID: 1,
}
