package tests

import (
	"testing"

	"spelldle.com/server/internal/testHelpers"
)

func TestMethods(t *testing.T) {
	testSpell := testHelpers.TestSpell
	testGuesses := testHelpers.TestGuesses
	testResults := testHelpers.TestResults

	t.Run("GetResults", func(t *testing.T) {
		for i := range testGuesses {
			guess1 := testGuesses[i]
			results := guess1.GetResults(&testSpell.SpellCategories)

			valid, msg := results.Equals(&testResults[i])
			if !valid {
				t.Errorf("mismatched results: %s\n", msg)
			}
		}
	})
	t.Run("SpellEqualsValid", func(t *testing.T) {
		copiedSpell := testSpell
		valid, msg := testSpell.Equals(&copiedSpell.SpellCategories)
		if !valid {
			t.Errorf("Error in SpellEquals: %s\n", msg)
		}
	})
	t.Run("SpellEqualsInvalidSlice", func(t *testing.T) {
		alteredSpell := testSpell
		alteredSpell.Class = []uint{8, 9}
		valid, _ := testSpell.Equals(&alteredSpell.SpellCategories)
		if valid {
			t.Error("Expected invalid, got valid")
		}
	})
	t.Run("SpellEqualsInvalidSingle", func(t *testing.T) {
		alteredSpell := testSpell
		alteredSpell.Range = testSpell.Range + 1
		valid, _ := testSpell.Equals(&alteredSpell.SpellCategories)
		if valid {
			t.Error("Expected invalid, got valid")
		}
	})

	t.Run("ResultsEqualsValid", func(t *testing.T) {
		copiedResult := testResults[0]
		valid, msg := testResults[0].Equals(&copiedResult)
		if !valid {
			t.Errorf("Error in ResultsEquals: %s\n", msg)
		}
	})
	t.Run("ResultsEqualsInvalid", func(t *testing.T) {
		copiedResult := testResults[0]
		copiedResult.Target++
		valid, _ := testResults[0].Equals(&copiedResult)
		if valid {
			t.Error("expected invalid, got valid")
		}
	})
}
