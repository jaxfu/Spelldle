package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetGuessCategoriesByGuessId = `
  SELECT spell, school, casting_time, range, target, duration, level, components, class, effects
  FROM guesses.categories
  WHERE game_session_id=$1 AND round=$2
`

func (dbHandler *DBHandler) GetGuessCategoriesByGuessID(guessID types.GuessID) (types.GuessCategories, error) {
	var guess types.GuessCategories

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGuessCategoriesByGuessId, guessID.GameSessionID, guessID.Round).Scan(
		&guess.Spell,
		&guess.School,
		&guess.CastingTime,
		&guess.Range,
		&guess.Target,
		&guess.Duration,
		&guess.Level,
		&guess.Components,
		&guess.Class,
		&guess.Effects,
	)
	if err != nil {
		return guess, err
	}

	return guess, nil
}

func (dbHandler *DBHandler) GetAllGuessCategoriesByUserID(userID types.UserID) ([]types.GuessCategories, error) {
	var guesses []types.GuessCategories
	gameSession, err := dbHandler.GetGameSessionByUserID(userID)
	if err != nil {
		return guesses, err
	}

	for i := range gameSession.Rounds {
		guess, err := dbHandler.GetGuessCategoriesByGuessID(types.GuessID{
			GameSessionID: gameSession.GameSessionID,
			Round:         i + 1,
		})
		if err != nil {
			return guesses, err
		}

		guesses = append(guesses, guess)
	}

	return guesses, nil
}

const QGetGuessResultsByGuessId = `
  SELECT spell, school, casting_time, range, target, duration, level, components, class, effects
  FROM guesses.results
  WHERE game_session_id=$1 AND round=$2
`

func (dbHandler *DBHandler) GetGuessResultsByGuessID(guessID types.GuessID) (types.GuessResults, error) {
	var results types.GuessResults

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGuessResultsByGuessId, guessID.GameSessionID, guessID.Round).Scan(
		&results.Spell,
		&results.School,
		&results.CastingTime,
		&results.Range,
		&results.Target,
		&results.Duration,
		&results.Level,
		&results.Components,
		&results.Class,
		&results.Effects,
	)
	if err != nil {
		return results, err
	}

	return results, nil
}

func (dbHandler *DBHandler) GetAllGuessResultsByUserID(userID types.UserID) ([]types.GuessResults, error) {
	var results []types.GuessResults
	gameSession, err := dbHandler.GetGameSessionByUserID(userID)
	if err != nil {
		return results, err
	}

	for i := range gameSession.Rounds {
		result, err := dbHandler.GetGuessResultsByGuessID(types.GuessID{
			GameSessionID: gameSession.GameSessionID,
			Round:         i + 1,
		})
		if err != nil {
			return results, err
		}

		results = append(results, result)
	}

	return results, nil
}

func (dbHandler *DBHandler) GetAllGuessAllByUserID(userID types.UserID) ([]types.GuessAll, error) {
	var allGuessAll []types.GuessAll
	gameSession, err := dbHandler.GetGameSessionByUserID(userID)
	if err != nil {
		return allGuessAll, err
	}

	for i := range gameSession.Rounds {
		guessID := types.GuessID{
			GameSessionID: gameSession.GameSessionID,
			Round:         i + 1,
		}
		guessAll := types.GuessAll{
			GuessID: guessID,
		}
		categories, err := dbHandler.GetGuessCategoriesByGuessID(guessID)
		if err != nil {
			return allGuessAll, err
		}
		results, err := dbHandler.GetGuessResultsByGuessID(guessID)
		if err != nil {
			return allGuessAll, err
		}

		guessAll.Categories = categories
		guessAll.Results = results
		allGuessAll = append(allGuessAll, guessAll)
	}

	return allGuessAll, nil
}

// INSERTS

const EInsertGuessID = `
  INSERT INTO guesses.ids(game_session_id, round)
  VALUES ($1, $2)
`

const EInsertGuessCategories = `
  INSERT INTO guesses.categories(game_session_id, round, spell, school, casting_time, range, target, duration, level, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
`

func (dbHandler *DBHandler) InsertGuessCategories(guess types.GuessCategories, guessID types.GuessID) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertGuessID,
		guessID.GameSessionID,
		guessID.Round,
	)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertGuessCategories,
		guessID.GameSessionID,
		guessID.Round,
		guess.Spell,
		guess.School,
		guess.CastingTime,
		guess.Range,
		guess.Target,
		guess.Duration,
		guess.Level,
		guess.Components,
		guess.Class,
		guess.Effects,
	)
	if err != nil {
		return err
	}

	return nil
}

const EInsertGuessResults = `
  INSERT INTO guesses.results(game_session_id, round, spell, school, casting_time, range, target, duration, level, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
`

func (dbHandler *DBHandler) InsertGuessResults(results types.GuessResults, guessID types.GuessID) error {
	if _, err := dbHandler.Conn.Exec(context.Background(), EInsertGuessResults,
		guessID.GameSessionID,
		guessID.Round,
		results.Spell,
		results.School,
		results.CastingTime,
		results.Range,
		results.Target,
		results.Duration,
		results.Level,
		results.Components,
		results.Class,
		results.Effects,
	); err != nil {
		return err
	}

	return nil
}
