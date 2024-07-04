package types

type GuessAllInfo struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	SpellCategories
	Round uint `json:"round"`
}

type GuessResults struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	Round         uint          `json:"round"`
	Components    int           `json:"components"`
	Class         int           `json:"class"`
	Effects       int           `json:"effects"`
	Level         int           `json:"level"`
	School        int           `json:"school"`
	CastingTime   int           `json:"casting_time"`
	Range         int           `json:"range"`
	Target        int           `json:"target"`
	Duration      int           `json:"duration"`
}
