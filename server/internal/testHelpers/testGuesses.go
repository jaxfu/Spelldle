package testHelpers

import "spelldle.com/server/shared/types"

const GameSessionID types.GameSessionID = "9ff6b354-1063-40f6-b196-fa422723b978"

// ROUND 1: All incorrect
// ROUND 2: Some correct
// ROUND 3: All correct
var TestGuesses = [3]types.GuessCategories{
	{
		Components:  []uint{10, 11},
		Class:       []uint{12, 13, 14},
		Effects:     []uint{15, 16, 17},
		Level:       [2]uint{0, 0},
		Duration:    [2]uint{1, 1},
		School:      9,
		CastingTime: 10,
		Range:       11,
		Target:      12,
	},
	{
		Components:  []uint{1, 3, 4},
		Class:       []uint{3, 4, 10},
		Effects:     []uint{7, 10, 13, 14},
		Level:       [2]uint{1, 0},
		Duration:    [2]uint{1, 0},
		School:      0,
		CastingTime: 10,
		Range:       11,
		Target:      12,
	},
	{
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
}

var TestResults = [3]types.GuessResults{
	{
		Components:  0,
		Class:       0,
		Effects:     0,
		Level:       0,
		School:      0,
		CastingTime: 0,
		Range:       0,
		Target:      0,
		Duration:    0,
	},
	{
		Components:  1,
		Class:       1,
		Effects:     1,
		Level:       1,
		Duration:    1,
		School:      2,
		CastingTime: 0,
		Range:       0,
		Target:      0,
	},
	{
		Components:  2,
		Class:       2,
		Effects:     2,
		Level:       2,
		Duration:    2,
		School:      2,
		CastingTime: 2,
		Range:       2,
		Target:      2,
	},
}
