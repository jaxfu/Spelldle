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

type GuessResults struct {
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

type PastGuessesAll struct {
	Components  PastGuessesMulti  `json:"components"`
	Class       PastGuessesMulti  `json:"class"`
	Effects     PastGuessesMulti  `json:"effects"`
	Level       PastGuessesMulti  `json:"level"`
	School      PastGuessesSingle `json:"school"`
	CastingTime PastGuessesSingle `json:"casting_time"`
	Range       PastGuessesSingle `json:"range"`
	Target      PastGuessesSingle `json:"target"`
	Duration    PastGuessesSingle `json:"duration"`
	Round       uint              `json:"round"`
}

type PastGuessesSingle struct {
	Value  uint `json:"value"`
	Result uint `json:"result"`
}

type PastGuessesMulti struct {
	Value  []uint `json:"value"`
	Result uint   `json:"result"`
}
