package utils

import (
	"fmt"

	"github.com/google/uuid"
	"golang.org/x/exp/rand"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

// generate new game session
func SpawnNewGameSession(userID types.UserID, db *dbHandler.DBHandler) (types.GameSession, error) {
	var session types.GameSession

	gameSessionID, err := createAndInsertNewGameSessionID(db)
	if err != nil {
		return session, err
	}

	// initialize guesses.spells
	if err := db.InitializeGuessSpell(gameSessionID); err != nil {
		return session, err
	}

	session.GameSessionID = gameSessionID
	session.UserID = userID
	session.CategoryRounds = 0
	session.SpellRounds = 0

	count, err := db.GetSpellsCount()
	if err != nil {
		return session, err
	}

	session.SpellID = randomUint(count)

	return session, nil
}

func createAndInsertNewGameSessionID(db *dbHandler.DBHandler) (types.GameSessionID, error) {
	var id types.GameSessionID

	for {
		// Generate a new UUID
		id = uuid.New().String()

		// Execute the query
		result, err := db.InsertGameSessionID(id)
		if err != nil {
			return id, err
		}

		// Check if the insert was successful
		if result.RowsAffected() > 0 {
			// Successfully inserted
			fmt.Println("Successfully inserted record with UUID:", id)
			break
		}

		// If no rows were affected, it means there was a conflict, so we retry
		fmt.Println("UUID conflict detected, generating a new UUID and retrying...")
	}

	return id, nil
}

func randomUint(count uint) uint {
	return uint(rand.Intn(int(count))) + 1
}
