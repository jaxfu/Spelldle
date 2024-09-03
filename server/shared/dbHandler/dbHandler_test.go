package dbHandler

import (
	"context"
	"errors"
	"fmt"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
	"spelldle.com/server/internal/testHelpers"
	"spelldle.com/server/shared/types"

	"github.com/joho/godotenv"
)

func TestDBHandler(t *testing.T) {
	if err := godotenv.Load("../../../config/config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	dbHandler := InitDBHandler(os.Getenv("DB_URL_TEST"))
	defer dbHandler.Conn.Close()

	testUserData := testHelpers.TestUserData
	testSpellData := testHelpers.TestSpell
	testGuessesData := testHelpers.TestGuesses
	testResultsData := testHelpers.TestResults
	testGameSessionData := testHelpers.TestGameSession
	testSpellGuessesCount := 2

	t.Run("Ping connection", func(t *testing.T) {
		if err := dbHandler.Conn.Ping(context.Background()); err != nil {
			t.Errorf("Error initializing database: %+v\n", err)
		}
	})
	t.Run("DropTablesStart", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
	t.Run("CreateTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_CREATE_TABLES")); err != nil {
			t.Errorf("Error initializing tables: %+v\n", err)
		}
	})

	t.Run("InsertUser", func(t *testing.T) {
		userId, err := dbHandler.InsertUser()
		if err != nil {
			t.Errorf("Error in InsertUser: %+v\n", err)
		}
		if userId != 1 {
			t.Errorf("Inserted user id should be %d, but got %d\n", testUserData.UserID, userId)
		}
	})

	t.Run("InsertUserData", func(t *testing.T) {
		if err := dbHandler.InsertUserData(testUserData); err != nil {
			t.Errorf("Error in InsertUserData: %+v\n", err)
		}
	})
	t.Run("GetUserDataByUserID", func(t *testing.T) {
		userData, err := dbHandler.GetUserDataByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("Error in GetUserDataByUserID: %+v\n", err)
		}
		if userData != testUserData {
			t.Errorf("Mismatch in GetUserDataByUserID: got %+v, want %+v", userData, testUserData)
		}
	})
	t.Run("GetUserIDByUsernameValid", func(t *testing.T) {
		userID, err := dbHandler.GetUserIDByUsername(testUserData.Username)
		if err != nil {
			t.Errorf("Error in GetUserIDByUsername: %+v\n", err)
		}
		if userID != testUserData.UserID {
			t.Errorf("Invalid UserID: got %d, want %d", userID, testUserData.UserID)
		}
	})
	t.Run("GetUserIDByUsernameInvalid", func(t *testing.T) {
		_, err := dbHandler.GetUserIDByUsername("test")
		if !errors.Is(err, pgx.ErrNoRows) {
			t.Errorf("Expected pgx.ErrNoRows: %+v\n", err)
		}
	})

	t.Run("InsertSpell", func(t *testing.T) {
		err := dbHandler.InsertSpell(testSpellData)
		if err != nil {
			t.Errorf("Error inserting spell: %+v", err)
		}
	})
	t.Run("GetSpellBySpellID", func(t *testing.T) {
		spellInfo, err := dbHandler.GetSpellBySpellId(testSpellData.SpellID)
		if err != nil {
			t.Errorf("Error getting spell: %+v", err)
		}
		if spellInfo.SpellID != testSpellData.SpellID {
			t.Errorf("Mismatch in GetSpellBySpellID: got %+v, want %+v", spellInfo.SpellID, testSpellData.SpellID)
		}
	})

	t.Run("InsertGameSession", func(t *testing.T) {
		if _, err := dbHandler.InsertGameSessionID(testHelpers.GameSessionID); err != nil {
			t.Errorf("error inserting game session: %+v", err)
		}

		err := dbHandler.InsertGameSession(testGameSessionData)
		if err != nil {
			t.Errorf("Error inserting game session: %+v", err)
		}
	})
	t.Run("GetGameSessionIDByUserID", func(t *testing.T) {
		gameSessionID, err := dbHandler.GetGameSessionIDByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("%+v\n", err)
		}
		if gameSessionID != testGameSessionData.GameSessionID {
			t.Errorf("gameSessionID mismatch: got %+v, want %+v", gameSessionID, testGameSessionData.GameSessionID)
		}
	})
	t.Run("GetGameSessionByUserID", func(t *testing.T) {
		gameSession, err := dbHandler.GetGameSessionByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("Error getting game session: %+v", err)
		}
		if gameSession != testGameSessionData {
			t.Errorf("mismatch in GetGameSessionByUserID: got %+v, want %+v", gameSession, testGameSessionData)
		}
	})
	t.Run("GetGameSessionByGameSessionID", func(t *testing.T) {
		gameSession, err := dbHandler.GetGameSessionByGameSessionID(testGameSessionData.GameSessionID)
		if err != nil {
			t.Errorf("Error getting game session: %+v", err)
		}
		if gameSession.GameSessionID != testGameSessionData.GameSessionID {
			t.Errorf("Mismatch in GetGameSessionByGameID: got %+v, want %+v", gameSession.GameSessionID, testGameSessionData.GameSessionID)
		}
	})

	t.Run("InsertGuessCategories", func(t *testing.T) {
		for i := range testGuessesData {
			guessID := types.GuessID{
				GameSessionID: testGameSessionData.GameSessionID,
				Round:         uint(i + 1),
			}
			if err := dbHandler.InsertGuessCategories(testGuessesData[i], guessID); err != nil {
				t.Errorf("Error in InsertGuess: %+v", err)
			}
		}
	})
	t.Run("InitializeGuessSpells", func(t *testing.T) {
		if err := dbHandler.InitializeGuessSpell(testGameSessionData.GameSessionID); err != nil {
			t.Errorf("error initializing guesses: %+v", err)
		}
	})
	t.Run("InsertGuessSpells", func(t *testing.T) {
		for i := range testSpellGuessesCount {
			if err := dbHandler.InsertGuessSpell(testHelpers.GameSessionID, uint(i)); err != nil {
				t.Errorf("error inserting spell: %+v", err)
			}
		}
	})
	t.Run("GetGuessSpellsByGameSessionID", func(t *testing.T) {
		spells, err := dbHandler.GetGuessSpellsByGameSessionID(testGameSessionData.GameSessionID)
		if err != nil {
			t.Errorf("error getting spells: %+v", err)
		}

		if len(spells) != int(testGameSessionData.SpellRounds) {
			t.Errorf("mismatch in GetGuessSpellsByGameSessionID: got %d, want %d", len(spells), testGameSessionData.SpellRounds)
		}
	})
	t.Run("UpdateGameSessionSpellRounds", func(t *testing.T) {
		testSpellGuessesCount++
		if err := dbHandler.UpdateGameSessionSpellRounds(testGameSessionData.UserID, uint(testSpellGuessesCount)); err != nil {
			t.Errorf("error updating spell rounds: %+v", err)
		}

		gameSession, err := dbHandler.GetGameSessionByUserID(testGameSessionData.UserID)
		if err != nil {
			t.Errorf("error getting game session: %+v", err)
		}

		if gameSession.SpellRounds != uint(testSpellGuessesCount) {
			t.Errorf("rounds mismatch: got %d, want %d", gameSession.SpellRounds, testSpellGuessesCount)
		}
	})
	t.Run("GetGuessCategoriesByGuessID", func(t *testing.T) {
		for i := range testGuessesData {
			_, err := dbHandler.GetGuessCategoriesByGuessID(
				types.GuessID{
					GameSessionID: testGameSessionData.GameSessionID,
					Round:         uint(i + 1),
				},
			)
			if err != nil {
				t.Errorf("Error getting guess: %+v", err)
			}
		}
	})

	t.Run("InsertGuessResults", func(t *testing.T) {
		for i := range testResultsData {
			guessID := types.GuessID{
				GameSessionID: testGameSessionData.GameSessionID,
				Round:         uint(i + 1),
			}
			if err := dbHandler.InsertGuessResults(testResultsData[i], guessID); err != nil {
				t.Errorf("Error in InsertGuess: %+v", err)
			}
		}
	})
	t.Run("GetGuessResultsByGuessID", func(t *testing.T) {
		for i := range testResultsData {
			results, err := dbHandler.GetGuessResultsByGuessID(
				types.GuessID{
					GameSessionID: testGameSessionData.GameSessionID,
					Round:         uint(i + 1),
				},
			)
			if err != nil {
				t.Errorf("Error getting guess: %+v", err)
			}
			equals, msg := results.Equals(&testResultsData[i])
			if !equals {
				t.Errorf("Mismatch in GetGuessResultsByGuessID: %s", msg)
			}
		}
	})

	t.Run("UpdateGameSessionCategoryRounds", func(t *testing.T) {
		updatedRounds := testGameSessionData.CategoryRounds + 1
		err := dbHandler.UpdateGameSessionCategoryRounds(testUserData.UserID, updatedRounds)
		if err != nil {
			t.Errorf("error updating rounds: %+v", err)
		}

		gameSession, err := dbHandler.GetGameSessionByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("error getting game session: %+v\n", err)
		}

		if gameSession.CategoryRounds != updatedRounds {
			t.Errorf("rounds mismatch: got %d, want %d", gameSession.CategoryRounds, updatedRounds)
		}
	})

	t.Run("GetSpellsCount", func(t *testing.T) {
		count, err := dbHandler.GetSpellsCount()
		if err != nil {
			t.Errorf("error getting count: %+v", err)
		}
		if count != 1 {
			t.Errorf("count mismatch: got %d, want 1", count)
		}
	})

	t.Run("DropTablesEnd", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
