package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetGameSession = `
  SELECT game_session_id, spell_id, rounds
  FROM game_sessions.data
  WHERE game_session_id=$1
`

func (dbHandler *DBHandler) GetGameSessionByGameSessionID(gameSessionID types.GameSessionID) (types.GameSessionAll, error) {
	var gameSession types.GameSessionAll
	err := dbHandler.Conn.QueryRow(context.Background(), QGetGameSession, gameSessionID).Scan(
		&gameSession.GameSessionID,
		&gameSession.SpellID,
		&gameSession.Rounds,
	)
	if err != nil {
		return gameSession, err
	}

	return gameSession, nil
}

// INSERTS

const EInsertGameSessionID = `
  INSERT INTO game_sessions.ids(game_session_id)
  VALUES ($1)
`

const EInsertGameSessionData = `
  INSERT INTO game_sessions.data(game_session_id, spell_id, rounds)
  VALUES($1, $2, $3)
`

func (dbHandler *DBHandler) InsertGameSession(session types.GameSessionAll) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertGameSessionID,
		session.GameSessionID,
	)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertGameSessionData,
		session.GameSessionID,
		session.SpellID,
		2,
	)
	if err != nil {
		return err
	}

	return nil
}
