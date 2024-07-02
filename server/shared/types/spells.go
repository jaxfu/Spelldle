package types

type SpellAllInfo struct {
	Name string `json:"name"`
	SpellCategories
	SpellID uint `json:"spell_id"`
}

type SpellCategories struct {
	Components  []int      `json:"components"`
	Class       []int      `json:"class"`
	Effects     []int      `json:"effects"`
	Level       SpellLevel `json:"level"`
	School      int        `json:"school"`
	CastingTime int        `json:"casting_time"`
	Range       int        `json:"range"`
	Target      int        `json:"target"`
	Duration    int        `json:"duration"`
}

type SpellLevel struct {
	Level    int  `json:"level"`
	IsRitual bool `json:"is_ritual"`
}
