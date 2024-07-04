package testHelpers

import "spelldle.com/server/shared/types"

// ROUND 1: All incorrect
// ROUND 2: Some correct
// ROUND 3: All correct
var TestGuesses = []types.GuessAllInfo{
	{
		GameSessionID: "TEST",
		Round:         1,
		SpellCategories: types.SpellCategories{
			Components: []int{10, 11},
			Class:      []int{12, 13, 14},
			Effects:    []int{15, 16, 17},
			Level: types.SpellLevel{
				Level:    0,
				IsRitual: true,
			},
			School:      9,
			CastingTime: 10,
			Range:       11,
			Target:      12,
			Duration:    13,
		},
	},
	{
		GameSessionID: "TEST",
		Round:         2,
		SpellCategories: types.SpellCategories{
			Components: []int{1, 3, 4},
			Class:      []int{3, 4, 10},
			Effects:    []int{7, 10, 13, 14},
			Level: types.SpellLevel{
				Level:    1,
				IsRitual: true,
			},
			School:      0,
			CastingTime: 10,
			Range:       11,
			Target:      12,
			Duration:    13,
		},
	},
	{
		GameSessionID: "TEST",
		Round:         3,
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
	},
}
