package types

import (
	"fmt"

	"golang.org/x/exp/slices"
)

func (spell *SpellCategories) Equals(other *SpellCategories) (bool, string) {
	if !slices.Equal(spell.Components, other.Components) {
		return false, fmt.Sprintf("field mismatch compnents: %v vs %v", spell.Components, other.Components)
	}
	if !slices.Equal(spell.Class, other.Class) {
		return false, fmt.Sprintf("field mismatch class: %v vs %v", spell.Class, other.Class)
	}
	if !slices.Equal(spell.Effects, other.Effects) {
		return false, fmt.Sprintf("field mismatch effects: %v vs %v", spell.Effects, other.Effects)
	}

	if spell.Level != other.Level {
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

	return true, ""
}

func (guess *SpellCategories) GetResults(spell *SpellCategories) GuessResults {
	var results GuessResults

	// test single ints
	singlesGuess := [5]*uint{&guess.School, &guess.CastingTime, &guess.Range, &guess.Target, &guess.Duration}
	singlesSpell := [5]*uint{&spell.School, &spell.CastingTime, &spell.Range, &spell.Target, &spell.Duration}
	singlesResult := [5]*uint{&results.School, &results.CastingTime, &results.Range, &results.Target, &results.Duration}

	for i := range singlesResult {
		if *singlesGuess[i] == *singlesSpell[i] {
			*singlesResult[i] = 2
		} else {
			*singlesResult[i] = 0
		}
	}

	// test level
	if guess.Level.Level == spell.Level.Level {
		if guess.Level.IsRitual == spell.Level.IsRitual {
			results.Level = 2
		} else {
			results.Level = 1
		}
	} else {
		if guess.Level.IsRitual == spell.Level.IsRitual {
			results.Level = 1
		} else {
			results.Level = 0
		}
	}

	// test arrays
	arraysGuess := [3]*[]uint{&guess.Class, &guess.Components, &guess.Effects}
	arraysSpell := [3]*[]uint{&spell.Class, &spell.Components, &spell.Effects}
	arraysResult := [3]*uint{&results.Class, &results.Components, &results.Effects}

	for i := range arraysResult {
		*arraysResult[i] = compareArrays(arraysGuess[i], arraysSpell[i])
	}

	return results
}

func compareArrays(guess, spell *[]uint) uint {
	a := *guess
	b := *spell

	if len(a) != len(b) {
		return checkCommonElements(a, b)
	}

	identical := true
	for i := range a {
		if a[i] != b[i] {
			identical = false
			break
		}
	}

	if identical {
		return 2
	}

	return checkCommonElements(a, b)
}

func checkCommonElements(a, b []uint) uint {
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] < b[j] {
			i++
		} else if a[i] > b[j] {
			j++
		} else {
			return 1
		}
	}

	return 0
}
