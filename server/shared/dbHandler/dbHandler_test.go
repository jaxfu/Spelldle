package dbHandler

import (
	"context"
	"errors"
	"fmt"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
	"spelldle.com/server/internal/testHelpers"

	"github.com/joho/godotenv"
)

func TestDBHandler(t *testing.T) {
	if err := godotenv.Load("../../../config/config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	dbHandler := InitDBHandler(os.Getenv("DB_URL_TEST"))
	defer dbHandler.Conn.Close()

	testUserID := testHelpers.TestUserDataAll.UserID
	testUserDataAccount := testHelpers.TestUserDataAll.UserDataAccount
	testUserDataPersonal := testHelpers.TestUserDataAll.UserDataPersonal

	t.Run("Ping connection", func(t *testing.T) {
		if err := dbHandler.Conn.Ping(context.Background()); err != nil {
			t.Errorf("Error initializing database: %+v\n", err)
		}
	})
	t.Run("DropTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
	t.Run("CreateTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_CREATE_TABLES")); err != nil {
			t.Errorf("Error initializing tables: %+v\n", err)
		}
	})

	t.Run("InsertUser", func(t *testing.T) {
		userId, err := dbHandler.InsertUser()
		if err != nil {
			t.Errorf("Error in InsertUser: %+v\n", err)
		}
		if userId != 1 {
			t.Errorf("Inserted user id should be %d, but got %d\n", testUserID, userId)
		}
	})

	t.Run("InsertUserDataAccount", func(t *testing.T) {
		if err := dbHandler.InsertUserDataAccount(testUserID, testUserDataAccount); err != nil {
			t.Errorf("Error in InsertUserDataAccount: %+v\n", err)
		}
	})
	t.Run("GetUserDataAccountByUserID", func(t *testing.T) {
		userDataAccount, err := dbHandler.GetUserDataAccountByUserID(testUserID)
		if err != nil {
			t.Errorf("Error in GetUserDataAccountByUserID: %+v\n", err)
		}
		if userDataAccount != testUserDataAccount {
			t.Errorf("Mismatch in GetUserDataAccountByUserID: got %+v, want %+v", userDataAccount, testUserDataAccount)
		}
	})

	t.Run("InsertUserDataPersonal", func(t *testing.T) {
		if err := dbHandler.InsertUserDataPersonal(testUserID, testUserDataPersonal); err != nil {
			t.Errorf("Error in InsertUserDataPersonal: %+v\n", err)
		}
	})
	t.Run("GetUserDataPersonalByUserID", func(t *testing.T) {
		userDataPersonal, err := dbHandler.GetUserDataPersonalByUserID(testUserID)
		if err != nil {
			t.Errorf("Error in GetUserDataPersonalByUserID: %+v\n", err)
		}
		if userDataPersonal != testUserDataPersonal {
			t.Errorf("Mismatch in GetUserDataPersonalByUserID: got %+v, want %+v", userDataPersonal, testUserDataPersonal)
		}
	})

	t.Run("GetUserIDByUsernameValid", func(t *testing.T) {
		_, err := dbHandler.GetUserIDByUsername(testUserDataAccount.Username)
		if err != nil {
			t.Errorf("Error in GetUserIDByUsername: %+v\n", err)
		}
	})
	t.Run("GetUserIDByUsernameInvalid", func(t *testing.T) {
		_, err := dbHandler.GetUserIDByUsername("test")
		if !errors.Is(err, pgx.ErrNoRows) {
			t.Errorf("Expected pgx.ErrNoRows: %+v\n", err)
		}
	})

	t.Run("DropTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
