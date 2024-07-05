package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetGameSessionByGameSessionID = `
  SELECT game_session_id, user_id, spell_id, rounds
  FROM game_sessions.data
  WHERE game_session_id=$1
`

func (dbHandler *DBHandler) GetGameSessionByGameSessionID(gameSessionID types.GameSessionID) (types.GameSession, error) {
	var gameSession types.GameSession
	err := dbHandler.Conn.QueryRow(context.Background(), QGetGameSessionByGameSessionID, gameSessionID).Scan(
		&gameSession.GameSessionID,
		&gameSession.UserID,
		&gameSession.SpellID,
		&gameSession.Rounds,
	)
	if err != nil {
		return gameSession, err
	}

	return gameSession, nil
}

const QGetGameSessionByUserID = `
  SELECT game_session_id, user_id, spell_id, rounds
  FROM game_sessions.data
  WHERE user_id=$1
`

func (dbHandler *DBHandler) GetGameSessionByUserID(userID types.UserID) (types.GameSession, error) {
	var gameSession types.GameSession

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGameSessionByUserID, userID).Scan(
		&gameSession.GameSessionID,
		&gameSession.UserID,
		&gameSession.SpellID,
		&gameSession.Rounds,
	)
	if err != nil {
		return gameSession, err
	}

	return gameSession, nil
}

const QGetGameSessionIDByUserID = `
  SELECT game_session_id
  FROM game_sessions.data
  WHERE user_id=$1
`

func (dbHandler *DBHandler) GetGameSessionIDByUserID(userID types.UserID) (types.GameSessionID, error) {
	var gameSessionID types.GameSessionID
	if err := dbHandler.Conn.QueryRow(context.Background(), QGetGameSessionIDByUserID, userID).Scan(&gameSessionID); err != nil {
		return gameSessionID, err
	}

	return gameSessionID, nil
}

// INSERTS

const EInsertGameSessionID = `
  INSERT INTO game_sessions.ids(game_session_id)
  VALUES ($1)
`

const EInsertGameSessionData = `
  INSERT INTO game_sessions.data(game_session_id, user_id, spell_id, rounds)
  VALUES($1, $2, $3, $4)
`

func (dbHandler *DBHandler) InsertGameSession(session types.GameSession) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertGameSessionID,
		session.GameSessionID,
	)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertGameSessionData,
		session.GameSessionID,
		session.UserID,
		session.SpellID,
		session.Rounds,
	)
	if err != nil {
		return err
	}

	return nil
}
