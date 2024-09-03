package testHelpers

import "spelldle.com/server/shared/types"

var TestGameSession = types.GameSession{
	GameSessionID:  "TEST",
	UserID:         1,
	SpellID:        1,
	CategoryRounds: 3,
	SpellRounds:    2,
}
