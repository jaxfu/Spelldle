package testHelpers

import "spelldle.com/server/shared/types"

var TestSpell = types.SpellAll{
	Name: "Fireball",
	SpellCategories: types.SpellCategories{
		Components:  []uint{1, 2},
		Class:       []uint{3, 4, 5},
		Effects:     []uint{6, 7, 8, 9},
		Level:       [2]uint{1, 1},
		Duration:    [2]uint{0, 0},
		School:      0,
		CastingTime: 1,
		Range:       2,
		Target:      3,
	},
	SpellID: 1,
}
