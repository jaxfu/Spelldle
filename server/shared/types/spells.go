package types

type SpellAllInfo struct {
	Name string `json:"name"`
	SpellCategories
	SpellID uint `json:"spell_id"`
}

type SpellCategories struct {
	Components  []uint     `json:"components"`
	Class       []uint     `json:"class"`
	Effects     []uint     `json:"effects"`
	Level       SpellLevel `json:"level"`
	School      uint       `json:"school"`
	CastingTime uint       `json:"casting_time"`
	Range       uint       `json:"range"`
	Target      uint       `json:"target"`
	Duration    uint       `json:"duration"`
}

type SpellLevel struct {
	Level    uint `json:"level"`
	IsRitual bool `json:"is_ritual"`
}
