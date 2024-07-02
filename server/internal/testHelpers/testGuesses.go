package testHelpers

import "spelldle.com/server/shared/types"

var TestGuess = types.GuessAllInfo{
	GameSessionID: "TEST",
	Round:         1,
	SpellCategories: types.SpellCategories{
		Components: []int{1, 2},
		Class:      []int{1, 2},
		Effects:    []int{1, 2},
		Level: types.SpellLevel{
			Level:    1,
			IsRitual: false,
		},
		School:      0,
		CastingTime: 0,
		Range:       0,
		Target:      0,
		Duration:    0,
	},
}
