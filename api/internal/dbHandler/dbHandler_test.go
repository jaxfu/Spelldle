package dbHandler

import (
	"context"
	"fmt"
	"os"
	"spelldle.com/server/internal/testHelpers"
	"testing"

	"github.com/joho/godotenv"
)

func TestDBHandler(t *testing.T) {
	if err := godotenv.Load("../../config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	dbHandler := InitDBHandler(os.Getenv("DB_URL_TEST"))
	defer dbHandler.DB.Close()

	testUserID := testHelpers.TestUserDataAll.UserID
	testUserDataAccount := testHelpers.TestUserDataAll.UserDataAccount
	testUserDataPersonal := testHelpers.TestUserDataAll.UserDataPersonal

	t.Run("Ping connection", func(t *testing.T) {
		if err := dbHandler.DB.Ping(context.Background()); err != nil {
			t.Errorf("Error initializing database: %+v\n", err)
		}
	})
	t.Run("DropTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
	t.Run("InitTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_CREATE_TABLES")); err != nil {
			t.Errorf("Error initializing tables: %+v\n", err)
		}
	})
	t.Run("InsertUser", func(t *testing.T) {
		if err := dbHandler.InsertUser(); err != nil {
			t.Errorf("Error in InsertUser: %+v\n", err)
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
	t.Run("DropTables", func(t *testing.T) {
		if err := dbHandler.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
