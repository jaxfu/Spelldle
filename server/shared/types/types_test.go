package types

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"spelldle.com/server/internal/testHelpers"
	"spelldle.com/server/shared/dbHandler"
)

func TestTypes(t *testing.T) {
	if err := godotenv.Load("../../../config/config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	db := dbHandler.InitDBHandler(os.Getenv("DB_URL_TEST"))
	defer db.Conn.Close()

	testSpell := testHelpers.TestSpell
	testGuesses := testHelpers.TestGuesses
	testResults := testHelpers.TestResults

	t.Run("CheckGuessCategoriesAgainstSpell", func(t *testing.T) {
		guess1 := testGuesses[0]
		fmt.Printf("Calculated Results: %+v\n", guess1.CheckGuessCategoriesAgainstSpell(&testSpell))
		fmt.Printf("Expected Results: %+v\n", testResults[0])
	})
}
