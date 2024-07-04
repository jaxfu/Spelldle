package tests

import (
	"testing"

	"spelldle.com/server/internal/testHelpers"
	"spelldle.com/server/shared/types"
)

func TestMethods(t *testing.T) {
	testSpell := testHelpers.TestSpell
	testGuesses := testHelpers.TestGuesses
	testResults := testHelpers.TestResults

	t.Run("GetResultsValid", func(t *testing.T) {
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
			t.Errorf("Error in Equals: %s\n", msg)
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
	t.Run("SpellEqualsInvalidLevel", func(t *testing.T) {
		alteredSpell := testSpell
		alteredSpell.Level = types.SpellLevel{
			Level:    testSpell.Level.Level + 1,
			IsRitual: testSpell.Level.IsRitual,
		}
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
}
