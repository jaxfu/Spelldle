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

func (guess *GuessCategories) GetResults(spell *SpellAll) GuessResults {
	var results GuessResults

	// test single ints
	singlesGuess := [5]*uint{&spell.School, &spell.CastingTime, &spell.Range, &spell.Target, &spell.Duration}
	singlesSpell := [5]*uint{&guess.School, &guess.CastingTime, &guess.Range, &guess.Target, &guess.Duration}
	singlesResult := [5]*uint{&results.School, &results.CastingTime, &results.Range, &results.Target, &results.Duration}

	for i := range singlesResult {
		if *singlesGuess[i] == *singlesSpell[i] {
			*singlesResult[i] = 2
		} else {
			*singlesResult[i] = 0
		}
	}

	// test level
	if guess.Level[0] != spell.Level[0] {
		if guess.Level[1] != spell.Level[1] {
			results.Level = 0
		} else {
			results.Level = 1
		}
	} else {
		if guess.Level[1] != spell.Level[1] {
			results.Level = 1
		} else {
			results.Level = 2
		}
	}

	// test arrays
	arraysGuess := [3]*[]uint{&spell.Class, &spell.Components, &spell.Effects}
	arraysSpell := [3]*[]uint{&guess.Class, &guess.Components, &guess.Effects}
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
