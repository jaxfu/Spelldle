package types

import (
	"fmt"
)

func (guess *GuessResults) Equals(other *GuessResults) (bool, string) {
	if guess.Components != other.Components {
		return false, fmt.Sprintf("field mismatch components: %d vs %d", guess.Components, other.Components)
	}
	if guess.Class != other.Class {
		return false, fmt.Sprintf("field mismatch class: %d vs %d", guess.Class, other.Class)
	}
	if guess.Effects != other.Effects {
		return false, fmt.Sprintf("field mismatch class: %d vs %d", guess.Effects, other.Effects)
	}
	if guess.School != other.School {
		return false, fmt.Sprintf("field mismatch school: %d vs %d", guess.School, other.School)
	}
	if guess.CastingTime != other.CastingTime {
		return false, fmt.Sprintf("field mismatch casting time: %d vs %d", guess.CastingTime, other.CastingTime)
	}
	if guess.Range != other.Range {
		return false, fmt.Sprintf("field mismatch range: %d vs %d", guess.Range, other.Range)
	}
	if guess.Target != other.Target {
		return false, fmt.Sprintf("field mismatch target: %d vs %d", guess.Target, other.Target)
	}
	if guess.Duration != other.Duration {
		return false, fmt.Sprintf("field mismatch duration: %d vs %d", guess.Duration, other.Duration)
	}

	return true, ""
}
