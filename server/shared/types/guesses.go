package types

type GuessID struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	Round         uint          `json:"round"`
}

type GuessCategories struct {
	GuessID
	SpellCategories
}

type GuessResults struct {
	GuessID
	Components  int `json:"components"`
	Class       int `json:"class"`
	Effects     int `json:"effects"`
	Level       int `json:"level"`
	School      int `json:"school"`
	CastingTime int `json:"casting_time"`
	Range       int `json:"range"`
	Target      int `json:"target"`
	Duration    int `json:"duration"`
}
