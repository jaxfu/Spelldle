// Package dbHandler handles communication with the Postgres database
package dbHandler

import (
	"context"
	"fmt"
	"os"

	"spelldle.com/server/shared/types"

	"github.com/jackc/pgx/v5/pgxpool"
)

// DBHandler object contains a pointer to pgx connection, one per server
type DBHandler struct {
	Conn *pgxpool.Pool
}

// InitDBHandler is the constructor for DBHandler, takes a database connection
// string and returns a pointer to instantiated DBHandler.
func InitDBHandler(connectionString string) *DBHandler {
	var newDBHandler DBHandler
	db, err := pgxpool.New(context.Background(), connectionString)
	if err != nil {
		fmt.Printf("%+v\n", err)
		os.Exit(1)
	}
	newDBHandler.Conn = db
	return &newDBHandler
}

// users
// Gets

const QGetUserIDByUsername = `
	SELECT user_id FROM users.data WHERE username=$1
`

func (dbHandler *DBHandler) GetUserIDByUsername(username string) (types.UserID, error) {
	var id types.UserID
	err := dbHandler.Conn.QueryRow(context.Background(), QGetUserIDByUsername, username).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

const QGetUserDataAllByUserID = `
	SELECT user_id, username, password, first_name, last_name
	FROM users.data
	WHERE user_id=$1
`

func (dbHandler *DBHandler) GetUserDataAllByUserID(UserID types.UserID) (types.UserDataAll, error) {
	var userDataAll types.UserDataAll
	err := dbHandler.Conn.QueryRow(context.Background(), QGetUserDataAllByUserID, UserID).Scan(
		&userDataAll.UserID,
		&userDataAll.Username,
		&userDataAll.Password,
		&userDataAll.FirstName,
		&userDataAll.LastName,
	)
	if err != nil {
		return userDataAll, err
	}
	return userDataAll, nil
}

// const QGetUserDataAccountByUserID = `
// 	SELECT username, password
// 	FROM users.data
// 	WHERE user_id=$1
// `
//
// func (dbHandler *DBHandler) GetUserDataAccountByUserID(UserID types.UserID) (types.UserDataAccount, error) {
// 	userDataAccount := types.UserDataAccount{}
// 	err := dbHandler.Conn.QueryRow(context.Background(), QGetUserDataAccountByUserID, UserID).Scan(
// 		&userDataAccount.Username,
// 		&userDataAccount.Password,
// 	)
// 	if err != nil {
// 		return userDataAccount, err
// 	}
// 	return userDataAccount, nil
// }

// const QGetUserDataPersonalByUserID = `
// 	SELECT first_name, last_name
// 	FROM users.user_data_personal
// 	WHERE user_id=$1
// `
//
// func (dbHandler *DBHandler) GetUserDataPersonalByUserID(userID types.UserID) (types.UserDataPersonal, error) {
// 	userDataPersonal := types.UserDataPersonal{}
// 	err := dbHandler.Conn.QueryRow(context.Background(), QGetUserDataPersonalByUserID, userID).Scan(
// 		&userDataPersonal.FirstName,
// 		&userDataPersonal.LastName,
// 	)
// 	if err != nil {
// 		return userDataPersonal, err
// 	}
// 	return userDataPersonal, nil
// }

// Inserts

const EInsertUser = `
	INSERT INTO users.ids DEFAULT VALUES
	RETURNING user_id
`

func (dbHandler *DBHandler) InsertUser() (types.UserID, error) {
	var userID types.UserID
	err := dbHandler.Conn.QueryRow(context.Background(), EInsertUser).Scan(&userID)
	if err != nil {
		return userID, err
	}
	return userID, nil
}

const EInsertUserDataAll = `
	INSERT INTO users.data (user_id, username, password, first_name, last_name)
	VALUES ($1, $2, $3, $4, $5)
`

func (dbHandler *DBHandler) InsertUserDataAll(userData types.UserDataAll) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertUserDataAll,
		userData.UserID,
		userData.Username,
		userData.Password,
		userData.FirstName,
		userData.LastName,
	)
	if err != nil {
		return err
	}
	return nil
}

// const EInsertUserDataPersonal = `
// 	INSERT INTO users.user_data_personal
// 	VALUES ($1, $2, $3)
// `
//
// func (dbHandler *DBHandler) InsertUserDataPersonal(userID types.UserID, personalData types.UserDataPersonal) error {
// 	_, err := dbHandler.Conn.Exec(context.Background(), EInsertUserDataPersonal,
// 		userID,
// 		personalData.FirstName,
// 		personalData.LastName,
// 	)
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }

// spells
// GETS
const QGetSpellBySpellId = `
  SELECT name, school, casting_time, range, target, duration, components, class, effects
  FROM spells.categories
  WHERE spell_id=$1
`

const QGetSpellLevelBySpellId = `
  SELECT level, is_ritual
  FROM spells.level_object
  WHERE spell_id=$1
`

func (dbHandler *DBHandler) GetSpellBySpellId(spellID uint) (types.SpellAllInfo, error) {
	spell := types.SpellAllInfo{}

	err := dbHandler.Conn.QueryRow(context.Background(), QGetSpellBySpellId, spellID).Scan(
		&spell.Name,
		&spell.School,
		&spell.CastingTime,
		&spell.Range,
		&spell.Target,
		&spell.Duration,
		&spell.Components,
		&spell.Class,
		&spell.Effects,
	)
	if err != nil {
		return spell, err
	}

	err = dbHandler.Conn.QueryRow(context.Background(), QGetSpellLevelBySpellId, spellID).Scan(
		&spell.Level.Level,
		&spell.Level.IsRitual,
	)
	if err != nil {
		return spell, err
	}

	return spell, nil
}

const EInsertSpellID = `
  INSERT INTO spells.ids(spell_id)
  VALUES ($1)
`

const EInsertSpell = `
  INSERT INTO spells.categories(spell_id, name, school, casting_time, range, target, duration, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`

const EInsertSpellLevel = `
  INSERT INTO spells.level_objects(spell_id, level, is_ritual)
  VALUES ($1, $2, $3)
`

// Inserts

func (dbHandler *DBHandler) InsertSpell(spellInfo types.SpellAllInfo) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertSpellID,
		spellInfo.SpellID,
	)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertSpell,
		spellInfo.SpellID,
		spellInfo.Name,
		spellInfo.School,
		spellInfo.CastingTime,
		spellInfo.Range,
		spellInfo.Target,
		spellInfo.Duration,
		spellInfo.Components,
		spellInfo.Class,
		spellInfo.Effects,
	)
	if err != nil {
		return err
	}
	_, err = dbHandler.Conn.Exec(context.Background(), EInsertSpellLevel,
		spellInfo.SpellID,
		spellInfo.Level.Level,
		spellInfo.Level.IsRitual,
	)
	if err != nil {
		return err
	}

	return nil
}

// TESTING

func (dbHandler *DBHandler) ExecuteSqlScript(filepath string) error {
	sqlFile, err := os.ReadFile(filepath)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), string(sqlFile))
	if err != nil {
		return err
	}

	return nil
}
