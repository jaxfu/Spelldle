// Package dbHandler handles communication with the Postgres database
package dbHandler

import (
	"context"
	"errors"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"os"
	"spelldle.com/server/internal/schemas"
)

// DBHandler object contains a pointer to pgx connection, one per server
type DBHandler struct {
	DB *pgxpool.Pool
}

// InitDBHandler is constructor for DBHandler, takes a database connection
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

// QUERIES

const QCheckIfUsernameExists = `
	SELECT username FROM user_account_info WHERE username=$1
`

// CheckIfUsernameExists takes in username string and searches database
// for it. Returns true/false and error.
func (dbHandler *DBHandler) CheckIfUsernameExists(username string) (bool, error) {
	var returnedUsername string
	err := dbHandler.DB.QueryRow(context.Background(), QCheckIfUsernameExists, username).Scan(&returnedUsername)
	if errors.Is(err, pgx.ErrNoRows) {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
}

const QGetUserIDByUsername = `
	SELECT user_id FROM user_account_info WHERE username=$1
`

// GetUserIDByUsername takes in username string and searches database
// for it. Returns userID (0 if error) and error
func (dbHandler *DBHandler) GetUserIDByUsername(username string) (uint, error) {
	var id uint
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserIDByUsername, username).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, nil
}

const QGetUserAccountInfoByID = `
	SELECT user_id, username, password, first_name, last_name
	FROM user_account_info
	WHERE user_id=$1
`

// GetUserAccountInfoByUserID takes in user_id and searches database,
// then returns result and error
func (dbHandler *DBHandler) GetUserAccountInfoByUserID(UserID uint) (schemas.UserAccountData, error) {
	var user schemas.UserAccountData
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserAccountInfoByID, UserID).Scan(&user.UserID, &user.Username, &user.Password, &user.FirstName, &user.LastName)
	if err != nil {
		return user, err
	}
	return user, nil
}

const QGetUserAccountInfoByUsername = `
	SELECT user_id, username, password, first_name, last_name
	FROM user_account_info
	WHERE username=$1
`

// GetUserAccountInfoByUsername takes in username string and searches database,
// then returns result and error
func (dbHandler *DBHandler) GetUserAccountInfoByUsername(username string) (schemas.UserAccountData, error) {
	var user schemas.UserAccountData
	err := dbHandler.DB.QueryRow(context.Background(), QGetUserAccountInfoByUsername, username).Scan(&user.UserID, &user.Username, &user.Password, &user.FirstName, &user.LastName)
	if err != nil {
		return user, err
	}
	return user, nil
}

const QGetUserSessionDataByUserID = `
	SELECT user_id, session_key, expires
	FROM user_session_data
	WHERE user_id=$1
`

// GetUserSessionDataByUserID takes in username string, searches then returns
// session data and error
func (dbHandler *DBHandler) GetUserSessionDataByUserID(id uint) (schemas.UserSessionData, error) {
	var sessionData schemas.UserSessionData

	if err := dbHandler.DB.QueryRow(context.Background(), QGetUserSessionDataByUserID, id).Scan(&sessionData.UserID, &sessionData.SessionKey, &sessionData.Expires); err != nil {
		return sessionData, err
	} else if id != sessionData.UserID {
		return sessionData, errors.New("id mismatch when searching for session data by id")
	}

	return sessionData, nil
}

// EXECS

const EInsertUserRegisterInfo = `
	INSERT INTO user_account_info (username, password, first_name, last_name)
	VALUES ($1, $2, $3, $4)
`

// InsertUserRegisterInfo RegisterPayload and inserts data into user_info
// table, returns error
func (dbHandler *DBHandler) InsertUserRegisterInfo(r schemas.RegisterPayload) error {
	_, err := dbHandler.DB.Exec(context.Background(), EInsertUserRegisterInfo, r.Username, r.Password, r.FirstName, r.LastName)
	if err != nil {
		return err
	}
	return nil
}

const EInsertUserSessionData = `
	INSERT INTO user_session_data (user_id, session_key, expires)
	VALUES ($1, $2, $3)
`

// InsertUserSessionData takes UserSessionData object and inserts it into database
// session_data table, returns error
func (dbHandler *DBHandler) InsertUserSessionData(s schemas.UserSessionData) error {
	_, err := dbHandler.DB.Exec(context.Background(), EInsertUserSessionData, s.UserID, s.SessionKey, s.Expires)
	if err != nil {
		log.Printf("Error inserting session data: %+v\n", err)
		return err
	}
	return nil
}

// TESTING

const EInitUserInfo = `
	CREATE TABLE user_account_info
(
    user_id    SERIAL PRIMARY KEY,
    username   VARCHAR(32),
    password   VARCHAR(32),
    first_name VARCHAR(32),
    last_name  VARCHAR(32)
)
`

const EInitSessionData = `
	CREATE TABLE user_session_data
(
    user_id     INTEGER PRIMARY KEY,
    session_key VARCHAR(36),
    expires     BIGINT,
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
			REFERENCES user_account_info (user_id)
)
`

// CreateTables is used for testing, creates all tables from database, returns error
func (dbHandler *DBHandler) CreateTables() error {
	if _, err := dbHandler.DB.Exec(context.Background(), EInitUserInfo); err != nil {
		fmt.Printf("Error initializing user_info: %+v\n", err)
	}
	if _, err := dbHandler.DB.Exec(context.Background(), EInitSessionData); err != nil {
		fmt.Printf("Error initializing session_data: %+v\n", err)
	}
	return nil
}

const EDeleteAllSessionData = `
	DROP TABLE IF EXISTS user_session_data
`

const EDeleteAllUserInfo = `
	DROP TABLE IF EXISTS user_account_info
`

// DropTables is used for testing, drops all tables from database, returns error
func (dbHandler *DBHandler) DropTables() error {
	if _, err := dbHandler.DB.Exec(context.Background(), EDeleteAllSessionData); err != nil {
		fmt.Printf("Error dropping session_data table: %+v\n", err)
		return err
	}
	if _, err := dbHandler.DB.Exec(context.Background(), EDeleteAllUserInfo); err != nil {
		fmt.Printf("Error dropping user_info table: %+v\n", err)
		return err
	}
	return nil
}
