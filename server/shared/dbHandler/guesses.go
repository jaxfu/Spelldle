package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetGuessCategoriesByGuessId = `
  SELECT school, casting_time, range, target, duration, level, components, class, effects
  FROM guesses.categories
  WHERE game_session_id=$1 AND round=$2
`

func (dbHandler *DBHandler) GetGuessCategoriesByGuessID(guessID types.GuessID) (types.GuessCategories, error) {
	var guess types.GuessCategories

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGuessCategoriesByGuessId, guessID.GameSessionID, guessID.Round).Scan(
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

const QGetGuessResultsByGuessId = `
  SELECT school, casting_time, range, target, duration, level, components, class, effects
  FROM guesses.results
  WHERE game_session_id=$1 AND round=$2
`

func (dbHandler *DBHandler) GetGuessResultsByGuessID(guessID types.GuessID) (types.GuessResults, error) {
	var results types.GuessResults

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGuessResultsByGuessId, guessID.GameSessionID, guessID.Round).Scan(
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

const QGetGuessSpellsByGameSessionID = `
	SELECT spells
	FROM guesses.spells
	WHERE game_session_id=$1
`

func (dbHandler *DBHandler) GetGuessSpellsByGameSessionID(id types.GameSessionID) (types.PastGuessesSpells, error) {
	var spells types.PastGuessesSpells

	if err := dbHandler.Conn.QueryRow(context.Background(), QGetGuessSpellsByGameSessionID, id).Scan(&spells); err != nil {
		return spells, err
	}

	return spells, nil
}

// INSERTS

const EInsertGuessCategories = `
  INSERT INTO guesses.categories(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
`

func (dbHandler *DBHandler) InsertGuessCategories(guess types.GuessCategories, guessID types.GuessID) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertGuessCategories,
		guessID.GameSessionID,
		guessID.Round,
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
  INSERT INTO guesses.results(game_session_id, round, school, casting_time, range, target, duration, level, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
`

func (dbHandler *DBHandler) InsertGuessResults(results types.GuessResults, guessID types.GuessID) error {
	if _, err := dbHandler.Conn.Exec(context.Background(), EInsertGuessResults,
		guessID.GameSessionID,
		guessID.Round,
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

const EInsertGuessSpell = `
INSERT INTO guesses.spells(game_session_id, spells)
VALUES ($1, ARRAY[$2::smallint])
ON CONFLICT (game_session_id)
DO UPDATE 
SET spells = guesses.spells.spells || EXCLUDED.spells
`

func (dbHandler *DBHandler) InsertGuessSpell(gameSessionID types.GameSessionID, spellID uint) error {
	if _, err := dbHandler.Conn.Exec(context.Background(), EInsertGuessSpell, gameSessionID, spellID); err != nil {
		return err
	}

	return nil
}
