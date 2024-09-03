package types

// gameSessionID format userID-count
type GameSessionID string

type GameSession struct {
	GameSessionID  GameSessionID `json:"game_session_id"`
	UserID         UserID        `json:"user_id"`
	SpellID        uint          `json:"spell_id"`
	CategoryRounds uint          `json:"category_rounds"`
	SpellRounds    uint          `json:"spell_rounds"`
}
