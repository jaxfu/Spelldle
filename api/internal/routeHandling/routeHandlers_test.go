package routeHandling

import (
	"fmt"
	"os"
	"spelldle.com/server/internal/schemas"
	"spelldle.com/server/internal/testHelpers"
	"testing"

	"github.com/joho/godotenv"
	"spelldle.com/server/internal/dbHandler"
)

func TestRouteHandlers(t *testing.T) {
	if err := godotenv.Load("../../config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	// Init DBHandler
	db := dbHandler.InitDBHandler(os.Getenv("DB_URL_TEST"))
	routeHandler := InitRouteHandler(db)
	defer routeHandler.dbHandler.DB.Close()

	// Set up vars
	testUserRegisterPayload := testHelpers.TestUserRegisterPayload
	testUserLoginPayload := testHelpers.TestUserLoginPayload
	var testUserDataTokens schemas.UserDataTokens

	t.Run("DropTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
	t.Run("InitTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_CREATE_TABLES")); err != nil {
			t.Errorf("Error initializing tables: %+v\n", err)
		}
	})

	t.Run("Register", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin
		if err := testHelpers.TestHTTPRequest(
			&testUserRegisterPayload, &responseData,
			routeHandler.Register,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}
		testUserDataTokens = responseData.UserDataTokens

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserDataPersonal.FirstName != testUserRegisterPayload.FirstName {
			t.Errorf("First name is incorrect: got %s, want %s\n", responseData.UserDataPersonal.FirstName, testUserRegisterPayload.FirstName)
		}
		if responseData.UserDataPersonal.LastName != testUserRegisterPayload.LastName {
			t.Errorf("Last name is incorrect: got %s, want %s\n", responseData.UserDataPersonal.LastName, testUserRegisterPayload.LastName)
		}
		if responseData.UserDataAccount.Username != testUserRegisterPayload.Username {
			t.Errorf("username is incorrect: got %s, want %s\n", responseData.UserDataAccount.Username, testUserRegisterPayload.Username)
		}
	})

	t.Run("LoginValid", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin
		if err := testHelpers.TestHTTPRequest(
			&testUserLoginPayload,
			&responseData,
			routeHandler.Login,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserDataPersonal.FirstName != testUserRegisterPayload.FirstName {
			t.Errorf("First name is incorrect: got %s, want %s\n", responseData.UserDataPersonal.FirstName, testUserRegisterPayload.FirstName)
		}
		if responseData.UserDataPersonal.LastName != testUserRegisterPayload.LastName {
			t.Errorf("Last name is incorrect: got %s, want %s\n", responseData.UserDataPersonal.LastName, testUserRegisterPayload.LastName)
		}
		if responseData.UserDataAccount.Username != testUserRegisterPayload.Username {
			t.Errorf("username is incorrect: got %s, want %s\n", responseData.UserDataAccount.Username, testUserRegisterPayload.Username)
		}
	})

	t.Run("LoginInvalidUsername", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin

		if err := testHelpers.TestHTTPRequest(
			&testHelpers.TestUserLoginPayloadInvalidUsername,
			&responseData,
			routeHandler.Login,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	t.Run("LoginInvalidPassword", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin

		if err := testHelpers.TestHTTPRequest(
			&testHelpers.TestUserLoginPayloadInvalidPassword,
			&responseData,
			routeHandler.Login,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	t.Run("ValidateSession", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin

		if err := testHelpers.TestHTTPRequest(
			&testUserDataTokens,
			&responseData,
			routeHandler.ValidateSession,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserDataPersonal.FirstName != testUserRegisterPayload.FirstName {
			t.Errorf("First name is incorrect: got %s, want %s\n", responseData.UserDataPersonal.FirstName, testUserRegisterPayload.FirstName)
		}
		if responseData.UserDataPersonal.LastName != testUserRegisterPayload.LastName {
			t.Errorf("Last name is incorrect: got %s, want %s\n", responseData.UserDataPersonal.LastName, testUserRegisterPayload.LastName)
		}
		if responseData.UserDataAccount.Username != testUserRegisterPayload.Username {
			t.Errorf("username is incorrect: got %s, want %s\n", responseData.UserDataAccount.Username, testUserRegisterPayload.Username)
		}
	})

	t.Run("ValidateSessionInvalid", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin

		if err := testHelpers.TestHTTPRequest(
			&testHelpers.TestUserDataAll.UserDataTokens,
			&responseData,
			routeHandler.ValidateSession,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	t.Run("DropTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
