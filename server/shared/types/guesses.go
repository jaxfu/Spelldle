package types

type GuessID struct {
	GameSessionID GameSessionID `json:"game_session_id"`
	Round         uint          `json:"round"`
}

type GuessCategories struct {
	Components  []uint  `json:"components"`
	Class       []uint  `json:"class"`
	Effects     []uint  `json:"effects"`
	Level       [2]uint `json:"level"`
	Duration    [2]uint `json:"duration"`
	School      uint    `json:"school"`
	CastingTime uint    `json:"casting_time"`
	Range       uint    `json:"range"`
	Target      uint    `json:"target"`
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

type PastGuessesSpells []uint

type PastGuessCategory struct {
	Components  PastGuessCategoryMulti            `json:"components"`
	Class       PastGuessCategoryMulti            `json:"class"`
	Effects     PastGuessCategoryMulti            `json:"effects"`
	Level       PastGuessCategorySingleWithToggle `json:"level"`
	Duration    PastGuessCategorySingleWithToggle `json:"duration"`
	School      PastGuessCategorySingle           `json:"school"`
	CastingTime PastGuessCategorySingle           `json:"casting_time"`
	Range       PastGuessCategorySingle           `json:"range"`
	Target      PastGuessCategorySingle           `json:"target"`
	Spell       PastGuessCategorySingle           `json:"spell"`
	Round       uint                              `json:"round"`
}

type PastGuessCategorySingle struct {
	Value  uint `json:"value"`
	Result uint `json:"result"`
}

type PastGuessCategoryMulti struct {
	Value  []uint `json:"value"`
	Result uint   `json:"result"`
}

type PastGuessCategorySingleWithToggle struct {
	Value  [2]uint `json:"value"`
	Result uint    `json:"result"`
}
