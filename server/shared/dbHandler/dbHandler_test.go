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
			if err := dbHandler.InsertGuessCategories(testGuessesData[i]); err != nil {
				t.Errorf("Error in InsertGuess: %+v", err)
			}
		}
	})
	t.Run("GetGuessCategoriesByGuessID", func(t *testing.T) {
		for i := range testGuessesData {
			guessInfo, err := dbHandler.GetGuessCategoriesByGuessID(
				types.GuessID{
					GameSessionID: testGuessesData[i].GameSessionID,
					Round:         testGuessesData[i].Round,
				},
			)
			if err != nil {
				t.Errorf("Error getting guess: %+v", err)
			}
			if guessInfo.GuessID != testGuessesData[i].GuessID {
				t.Errorf("Mismatch in GetGuessByGameSessionID: got %+v, want %+v", guessInfo.GuessID, testGuessesData[i].GuessID)
			}
		}
	})
	t.Run("GetAllGuessCategoriesByUserID", func(t *testing.T) {
		guesses, err := dbHandler.GetAllGuessCategoriesByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("error getting all guesses: %+v", err)
		}
		fmt.Printf("%+v\n", guesses)
	})

	t.Run("InsertGuessResults", func(t *testing.T) {
		for i := range testResultsData {
			if err := dbHandler.InsertGuessResults(testResultsData[i]); err != nil {
				t.Errorf("Error in InsertGuess: %+v", err)
			}
		}
	})
	t.Run("GetGuessResultsByGuessID", func(t *testing.T) {
		for i := range testResultsData {
			results, err := dbHandler.GetGuessResultsByGuessID(
				types.GuessID{
					GameSessionID: testResultsData[i].GameSessionID,
					Round:         testResultsData[i].Round,
				},
			)
			if err != nil {
				t.Errorf("Error getting guess: %+v", err)
			}
			if results.GuessID != testResultsData[i].GuessID {
				t.Errorf("Mismatch in GetGuessByGameSessionID: got %+v, want %+v", results.GuessID, testResultsData[i].GuessID)
			}
			fmt.Printf("%+v\n", results)
		}
	})
	t.Run("GetAllGuessResultsByUserID", func(t *testing.T) {
		results, err := dbHandler.GetAllGuessResultsByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("error getting all results: %+v", err)
		}
		fmt.Printf("%+v\n", results)
	})

	t.Run("UpdateGameSessionRounds", func(t *testing.T) {
		updatedRounds := testGameSessionData.Rounds + 1
		err := dbHandler.UpdateGameSessionRounds(testUserData.UserID, updatedRounds)
		if err != nil {
			t.Errorf("error updating rounds: %+v", err)
		}

		gameSession, err := dbHandler.GetGameSessionByUserID(testUserData.UserID)
		if err != nil {
			t.Errorf("error getting game session: %+v\n", err)
		}

		if gameSession.Rounds != updatedRounds {
			t.Errorf("rounds mismatch: got %d, want %d", gameSession.Rounds, updatedRounds)
		}
	})

	t.Run("DropTablesEnd", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
