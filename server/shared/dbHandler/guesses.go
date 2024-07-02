package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetGuessAllByGuessId = `
  SELECT school, casting_time, range, target, duration, level, is_ritual, components, class, effects
  FROM guesses.categories
  NATURAL JOIN guesses.level_objects
  WHERE game_session_id=$1 AND round=$2
`

func (dbHandler *DBHandler) GetGuessByGameSessionId(gameSessionID types.GameSessionID, round uint) (types.GuessAllInfo, error) {
	guess := types.GuessAllInfo{
		GameSessionID: gameSessionID,
		Round:         round,
	}

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGuessAllByGuessId, gameSessionID, round).Scan(
		&guess.School,
		&guess.CastingTime,
		&guess.Range,
		&guess.Target,
		&guess.Duration,
		&guess.Level.Level,
		&guess.Level.IsRitual,
		&guess.Components,
		&guess.Class,
		&guess.Effects,
	)
	if err != nil {
		return guess, err
	}

	return guess, nil
}

// INSERTS

const EInsertGuessID = `
  INSERT INTO guesses.ids(game_session_id, round)
  VALUES ($1, $2)
`

const EInsertGuessCategories = `
  INSERT INTO guesses.categories(game_session_id, round, school, casting_time, range, target, duration, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`

const EInsertGuessLevel = `
  INSERT INTO Guesss.level_objects(game_session_id, round, level, is_ritual)
  VALUES ($1, $2, $3, $4)
`

func (dbHandler *DBHandler) InsertGuess(guess types.GuessAllInfo) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertGuessID,
		guess.GameSessionID,
		guess.Round,
	)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertGuessCategories,
		guess.GameSessionID,
		guess.Round,
		guess.School,
		guess.CastingTime,
		guess.Range,
		guess.Target,
		guess.Duration,
		guess.Components,
		guess.Class,
		guess.Effects,
	)
	if err != nil {
		return err
	}
	_, err = dbHandler.Conn.Exec(context.Background(), EInsertGuessLevel,
		guess.GameSessionID,
		guess.Round,
		guess.Level.Level,
		guess.Level.IsRitual,
	)
	if err != nil {
		return err
	}

	return nil
}
