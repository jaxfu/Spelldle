package dbHandler

import (
	"context"

	"github.com/jackc/pgx/v5/pgconn"
	"spelldle.com/server/shared/types"
)

// GETS

const QGetGameSessionByGameSessionID = `
  SELECT game_session_id, user_id, spell_id, category_rounds, spell_rounds
  FROM game_sessions.data
  WHERE game_session_id=$1
`

func (dbHandler *DBHandler) GetGameSessionByGameSessionID(gameSessionID types.GameSessionID) (types.GameSession, error) {
	var gameSession types.GameSession
	err := dbHandler.Conn.QueryRow(context.Background(), QGetGameSessionByGameSessionID, gameSessionID).Scan(
		&gameSession.GameSessionID,
		&gameSession.UserID,
		&gameSession.SpellID,
		&gameSession.CategoryRounds,
		&gameSession.SpellRounds,
	)
	if err != nil {
		return gameSession, err
	}

	return gameSession, nil
}

const QGetGameSessionByUserID = `
  SELECT game_session_id, user_id, spell_id, category_rounds, spell_rounds
	FROM users.data
	NATURAL JOIN game_sessions.data
  WHERE user_id=$1
`

func (dbHandler *DBHandler) GetGameSessionByUserID(userID types.UserID) (types.GameSession, error) {
	var gameSession types.GameSession

	err := dbHandler.Conn.QueryRow(context.Background(), QGetGameSessionByUserID, userID).Scan(
		&gameSession.GameSessionID,
		&gameSession.UserID,
		&gameSession.SpellID,
		&gameSession.CategoryRounds,
		&gameSession.SpellRounds,
	)
	if err != nil {
		return gameSession, err
	}

	return gameSession, nil
}

const QGetGameSessionIDByUserID = `
  SELECT game_session_id
  FROM users.data
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
	INSERT INTO game_sessions.ids (game_session_id)
  VALUES ($1)
  ON CONFLICT (game_session_id) DO NOTHING;
`

func (dbHandler *DBHandler) InsertGameSessionID(gameSessionID types.GameSessionID) (pgconn.CommandTag, error) {
	result, err := dbHandler.Conn.Exec(
		context.Background(),
		EInsertGameSessionID,
		gameSessionID,
	)

	return result, err
}

const EInsertGameSessionData = `
  INSERT INTO game_sessions.data(game_session_id, user_id, spell_id, category_rounds, spell_rounds)
  VALUES($1, $2, $3, $4, $5)
`

func (dbHandler *DBHandler) InsertGameSession(session types.GameSession) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertGameSessionData,
		session.GameSessionID,
		session.UserID,
		session.SpellID,
		session.CategoryRounds,
		session.SpellRounds,
	)
	if err != nil {
		return err
	}

	return nil
}

// UPDATES

const EUpdateGameSessionIDByUserID = `
	UPDATE users.data
  SET game_session_id = $1
	WHERE user_id = $2
`

func (dbHandler *DBHandler) UpdateGameSessionIDByUserID(gameSessionID types.GameSessionID, userID types.UserID) error {
	_, err := dbHandler.Conn.Exec(
		context.Background(),
		EUpdateGameSessionIDByUserID,
		gameSessionID,
		userID,
	)

	return err
}

const EUpdateCategoryRoundsByUserID = `
  UPDATE game_sessions.data
  SET category_rounds = $1, updated_at = NOW()
  WHERE user_id = $2
`

func (dbHandler *DBHandler) UpdateGameSessionCategoryRounds(userID types.UserID, rounds uint) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EUpdateCategoryRoundsByUserID,
		rounds,
		userID,
	)
	if err != nil {
		return err
	}

	return nil
}

const EUpdateSpellRoundsByUserID = `
  UPDATE game_sessions.data
  SET spell_rounds = $1, updated_at = NOW()
  WHERE user_id = $2
`

func (dbHandler *DBHandler) UpdateGameSessionSpellRounds(userID types.UserID, rounds uint) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EUpdateSpellRoundsByUserID,
		rounds,
		userID,
	)
	if err != nil {
		return err
	}

	return nil
}
