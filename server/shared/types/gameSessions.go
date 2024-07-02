package types

type GameSessionID string

type GameSessionAll struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	SpellID       uint          `json:"spell_id"`
	Rounds        uint          `json:"rounds"`
}
