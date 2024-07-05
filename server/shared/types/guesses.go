package types

type GuessAll struct {
	GuessID
	Categories SpellCategories `json:"categories"`
	Results    GuessResults    `json:"results"`
}

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
	Components  uint `json:"components"`
	Class       uint `json:"class"`
	Effects     uint `json:"effects"`
	Level       uint `json:"level"`
	School      uint `json:"school"`
	CastingTime uint `json:"casting_time"`
	Range       uint `json:"range"`
	Target      uint `json:"target"`
	Duration    uint `json:"duration"`
}
