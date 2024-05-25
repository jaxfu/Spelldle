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

	t.Run("Ping connection", func(t *testing.T) {
		if err := dbHandler.DB.Ping(context.Background()); err != nil {
			t.Errorf("Error initializing database: %+v\n", err)
		}
	})
	t.Run("InitTables", func(t *testing.T) {
		if err := dbHandler.CreateTables(); err != nil {
			t.Errorf("Error initializing tables: %+v\n", err)
		}
	})
	t.Run("InsertUserRegisterInfo", func(t *testing.T) {
		if err := dbHandler.InsertUserRegisterInfo(testHelpers.TestRegisterPayload); err != nil {
			t.Errorf("Error in InsertUserRegisterInfo: %+v\n", err)
		}
	})
	t.Run("GetUserAccountInfoByUserID", func(t *testing.T) {
		want := testHelpers.TestUserAccountData
		got, err := dbHandler.GetUserAccountInfoByUserID(testHelpers.TestUserAccountData.UserID)
		if err != nil {
			t.Errorf("Error in GetUserAccountInfoByUserID: %+v\n", err)
		}
		if got != want {
			t.Errorf("Mismatch on retrieved data from GetUserAccountInfoByUserID: got %+v, want %+v\n", got, want)
		}
	})
	t.Run("GetUserAccountInfoByUsername", func(t *testing.T) {
		want := testHelpers.TestUserAccountData
		got, err := dbHandler.GetUserAccountInfoByUsername(testHelpers.TestUserAccountData.Username)
		if err != nil {
			t.Errorf("Error in GetUserAccountInfoByUserID: %+v\n", err)
		}
		if got != want {
			t.Errorf("Mismatch on retrieved data from GetUserAccountInfoByUsername: got %+v, want %+v\n", got, want)
		}
	})
	t.Run("InsertUserSessionData", func(t *testing.T) {
		if err := dbHandler.InsertUserSessionData(testHelpers.TestUserSessionData); err != nil {
			t.Errorf("Error in InsertUserSessionData: %+v\n", err)
		}
	})
	t.Run("GetUserSessionDataByUserID", func(t *testing.T) {
		want := testHelpers.TestUserSessionData
		got, err := dbHandler.GetUserSessionDataByUserID(testHelpers.TestUserSessionData.UserID)
		if err != nil {
			t.Errorf("Error in GetUserSessionDataByUserID: %+v\n", err)
		}
		if got != want {
			t.Errorf("Mismatch in data returned from GetUserSessionDataByUserID: got %+v, want %+v\n", got, want)
		}
	})
	t.Run("DropTables", func(t *testing.T) {
		if err := dbHandler.DropTables(); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
