package types

type SpellAll struct {
	Name string `json:"name"`
	SpellCategories
	SpellID uint `json:"spell_id"`
}

type SpellCategories struct {
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
