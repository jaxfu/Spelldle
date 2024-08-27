package types

import (
	"fmt"

	"golang.org/x/exp/slices"
)

func (spell *SpellAll) Equals(other *SpellAll) (bool, string) {
	if !slices.Equal(spell.Components, other.Components) {
		return false, fmt.Sprintf("field mismatch compnents: %v vs %v", spell.Components, other.Components)
	}
	if !slices.Equal(spell.Class, other.Class) {
		return false, fmt.Sprintf("field mismatch class: %v vs %v", spell.Class, other.Class)
	}
	if !slices.Equal(spell.Effects, other.Effects) {
		return false, fmt.Sprintf("field mismatch effects: %v vs %v", spell.Effects, other.Effects)
	}
	if !slices.Equal(spell.Level, other.Level) {
		return false, fmt.Sprintf("field mismatch level: %+v vs %+v", spell.Level, other.Level)
	}

	if spell.School != other.School {
		return false, fmt.Sprintf("field mismatch school: %d vs %d", spell.School, other.School)
	}
	if spell.CastingTime != other.CastingTime {
		return false, fmt.Sprintf("field mismatch casting time: %d vs %d", spell.CastingTime, other.CastingTime)
	}
	if spell.Range != other.Range {
		return false, fmt.Sprintf("field mismatch range: %d vs %d", spell.Range, other.Range)
	}
	if spell.Target != other.Target {
		return false, fmt.Sprintf("field mismatch target: %d vs %d", spell.Target, other.Target)
	}
	if spell.Duration != other.Duration {
		return false, fmt.Sprintf("field mismatch duration: %d vs %d", spell.Duration, other.Duration)
	}
	if spell.SpellID != other.SpellID {
		return false, fmt.Sprintf("field mismatch spell id: %d vs %d", spell.SpellID, other.SpellID)
	}

	return true, ""
}
