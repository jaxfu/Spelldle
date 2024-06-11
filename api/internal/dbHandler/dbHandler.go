// Package dbHandler handles communication with the Postgres database
package dbHandler

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"os"
	"spelldle.com/server/internal/types"
)

// DBHandler object contains a pointer to pgx connection, one per server
type DBHandler struct {
	DB *pgxpool.Pool
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
	newDBHandler.DB = db
	return &newDBHandler
}

// Gets

const QGetUserIDByUsername = `
	SELECT user_id FROM user_data_account WHERE username=$1
`

func (dbHandler *DBHandler) GetUserIDByUsername(username string) (types.UserID, error) {
	var id types.UserID
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserIDByUsername, username).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

const QGetUserDataAllByUserID = `
	SELECT user_id, username, password, first_name, last_name
	FROM users
	NATURAL JOIN user_data_account
	NATURAL JOIN user_data_personal
	WHERE user_id=$1
`

func (dbHandler *DBHandler) GetUserDataAllByUserID(UserID types.UserID) (types.UserDataAll, error) {
	var userDataAll types.UserDataAll
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserDataAllByUserID, UserID).Scan(
		&userDataAll.UserID,
		&userDataAll.UserDataAccount.Username,
		&userDataAll.UserDataAccount.Password,
		&userDataAll.UserDataPersonal.FirstName,
		&userDataAll.UserDataPersonal.LastName)
	if err != nil {
		return userDataAll, err
	}
	return userDataAll, nil
}

const QGetUserDataAccountByUserID = `
	SELECT username, password
	FROM user_data_account
	WHERE user_id=$1
`

func (dbHandler *DBHandler) GetUserDataAccountByUserID(UserID types.UserID) (types.UserDataAccount, error) {
	userDataAccount := types.UserDataAccount{}
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserDataAccountByUserID, UserID).Scan(
		&userDataAccount.Username,
		&userDataAccount.Password,
	)
	if err != nil {
		return userDataAccount, err
	}
	return userDataAccount, nil
}

const QGetUserDataPersonalByUserID = `
	SELECT first_name, last_name
	FROM user_data_personal
	WHERE user_id=$1
`

func (dbHandler *DBHandler) GetUserDataPersonalByUserID(userID types.UserID) (types.UserDataPersonal, error) {
	userDataPersonal := types.UserDataPersonal{}
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserDataPersonalByUserID, userID).Scan(
		&userDataPersonal.FirstName,
		&userDataPersonal.LastName,
	)
	if err != nil {
		return userDataPersonal, err
	}
	return userDataPersonal, nil
}

// Inserts

const EInsertUser = `
	INSERT INTO users DEFAULT VALUES
	RETURNING user_id
`

func (dbHandler *DBHandler) InsertUser() (types.UserID, error) {
	var userID types.UserID
	err := dbHandler.DB.QueryRow(context.Background(), EInsertUser).Scan(&userID)
	if err != nil {
		return userID, err
	}
	return userID, nil
}

const EInsertUserDataAccount = `
	INSERT INTO user_data_account
	VALUES ($1, $2, $3)
`

func (dbHandler *DBHandler) InsertUserDataAccount(userID types.UserID, accountData types.UserDataAccount) error {
	_, err := dbHandler.DB.Exec(context.Background(), EInsertUserDataAccount,
		userID,
		accountData.Username,
		accountData.Password,
	)
	if err != nil {
		return err
	}
	return nil
}

const EInsertUserDataPersonal = `
	INSERT INTO user_data_personal
	VALUES ($1, $2, $3)
`

func (dbHandler *DBHandler) InsertUserDataPersonal(userID types.UserID, personalData types.UserDataPersonal) error {
	_, err := dbHandler.DB.Exec(context.Background(), EInsertUserDataPersonal,
		userID,
		personalData.FirstName,
		personalData.LastName,
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

	_, err = dbHandler.DB.Exec(context.Background(), string(sqlFile))
	if err != nil {
		return err
	}

	return nil
}
