package types

type GuessAll struct {
	GuessID
	Categories GuessCategories `json:"categories"`
	Results    GuessResults    `json:"results"`
}

type GuessID struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	Round         uint          `json:"round"`
}

type GuessCategories struct {
	Components  []uint `json:"components"`
	Class       []uint `json:"class"`
	Effects     []uint `json:"effects"`
	Level       []uint `json:"level"`
	School      uint   `json:"school"`
	CastingTime uint   `json:"casting_time"`
	Range       uint   `json:"range"`
	Target      uint   `json:"target"`
	Duration    uint   `json:"duration"`
	Spell       uint   `json:"spell"`
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
	Spell       uint `json:"spell"`
}

type PastGuessesAll struct {
	Components  PastGuessMulti  `json:"components"`
	Class       PastGuessMulti  `json:"class"`
	Effects     PastGuessMulti  `json:"effects"`
	Level       PastGuessMulti  `json:"level"`
	School      PastGuessSingle `json:"school"`
	CastingTime PastGuessSingle `json:"casting_time"`
	Range       PastGuessSingle `json:"range"`
	Target      PastGuessSingle `json:"target"`
	Duration    PastGuessSingle `json:"duration"`
	Spell       PastGuessSingle `json:"spell"`
	Round       uint            `json:"round"`
}

type PastGuessSingle struct {
	Value  uint `json:"value"`
	Result uint `json:"result"`
}

type PastGuessMulti struct {
	Value  []uint `json:"value"`
	Result uint   `json:"result"`
}
