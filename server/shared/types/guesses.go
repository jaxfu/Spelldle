package types

type GuessAllInfo struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	SpellCategories
	Round uint `json:"round"`
}
