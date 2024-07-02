package routes

import (
	"fmt"
	"os"
	"testing"

	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"

	"github.com/joho/godotenv"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/internal/testHelpers"
)

func TestRoutes(t *testing.T) {
	if err := godotenv.Load("../../../../config/config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	// Init DBHandler
	db := dbHandler.InitDBHandler(os.Getenv("DB_URL_TEST"))
	defer db.Conn.Close()

	// Set up vars
	testUserRegisterPayload := testHelpers.TestUserRegisterPayload
	testUserLoginPayload := testHelpers.TestUserLoginPayload
	var testUserDataTokens types.AllTokens

	t.Run("DropTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
	t.Run("CreateTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_CREATE_TABLES")); err != nil {
			t.Errorf("Error initializing tables: %+v\n", err)
		}
	})

	t.Run("Register", func(t *testing.T) {
		var responseData types.ResponseRegisterLogin
		if err := testHelpers.TestPostRequest(
			consts.RouteUrlRegister,
			&testUserRegisterPayload, &responseData,
			Register(db),
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}
		testUserDataTokens = responseData.Tokens

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserData.FirstName != testUserRegisterPayload.FirstName {
			t.Errorf("First name is incorrect: got %s, want %s\n", responseData.UserData.FirstName, testUserRegisterPayload.FirstName)
		}
		if responseData.UserData.LastName != testUserRegisterPayload.LastName {
			t.Errorf("Last name is incorrect: got %s, want %s\n", responseData.UserData.LastName, testUserRegisterPayload.LastName)
		}
		if responseData.UserData.Username != testUserRegisterPayload.Username {
			t.Errorf("username is incorrect: got %s, want %s\n", responseData.UserData.Username, testUserRegisterPayload.Username)
		}
	})

	t.Run("LoginValid", func(t *testing.T) {
		var responseData types.ResponseRegisterLogin
		if err := testHelpers.TestPostRequest(
			consts.RouteUrlLogin,
			&testUserLoginPayload,
			&responseData,
			Login(db),
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserData.FirstName != testUserRegisterPayload.FirstName {
			t.Errorf("First name is incorrect: got %s, want %s\n", responseData.UserData.FirstName, testUserRegisterPayload.FirstName)
		}
		if responseData.UserData.LastName != testUserRegisterPayload.LastName {
			t.Errorf("Last name is incorrect: got %s, want %s\n", responseData.UserData.LastName, testUserRegisterPayload.LastName)
		}
		if responseData.UserData.Username != testUserRegisterPayload.Username {
			t.Errorf("username is incorrect: got %s, want %s\n", responseData.UserData.Username, testUserRegisterPayload.Username)
		}
	})

	t.Run("LoginInvalidUsername", func(t *testing.T) {
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequest(
			consts.RouteUrlLogin,
			&testHelpers.TestUserLoginPayloadInvalidUsername,
			&responseData,
			Login(db),
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	t.Run("LoginInvalidPassword", func(t *testing.T) {
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequest(
			consts.RouteUrlLogin,
			&testHelpers.TestUserLoginPayloadInvalidPassword,
			&responseData,
			Login(db),
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	t.Run("ValidateSession", func(t *testing.T) {
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequestWithAuthTokens(
			consts.RouteUrlValidateSession,
			&testUserDataTokens,
			&responseData,
			ValidateSession(db),
			testUserDataTokens,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserData.UserID != testHelpers.TestUserData.UserID {
			t.Errorf("First name is incorrect: got %d, want %d\n", responseData.UserData.UserID, testHelpers.TestUserData.UserID)
		}
		if responseData.UserData.FirstName != testUserRegisterPayload.FirstName {
			t.Errorf("First name is incorrect: got %s, want %s\n", responseData.UserData.FirstName, testUserRegisterPayload.FirstName)
		}
		if responseData.UserData.LastName != testUserRegisterPayload.LastName {
			t.Errorf("Last name is incorrect: got %s, want %s\n", responseData.UserData.LastName, testUserRegisterPayload.LastName)
		}
		if responseData.UserData.Username != testUserRegisterPayload.Username {
			t.Errorf("username is incorrect: got %s, want %s\n", responseData.UserData.Username, testUserRegisterPayload.Username)
		}
	})

	t.Run("ValidateSessionInvalid", func(t *testing.T) {
		var responseData types.ResponseRegisterLogin

		invalidTokens := types.AllTokens{
			AccessToken: types.AccessToken{
				AccessToken: "invalid",
			},
			RefreshToken: types.RefreshToken{
				RefreshToken: "invalid",
			},
		}

		if err := testHelpers.TestPostRequestWithAuthTokens(
			consts.RouteUrlValidateSession,
			&types.AccessToken{
				AccessToken: "test",
			},
			&responseData,
			ValidateSession(db),
			invalidTokens,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	// t.Run("ValidateJWTMiddlewareValid", func(t *testing.T) {
	// 	ctx, err := testHelpers.TestMiddleware(testUserDataTokens, middleware.ValidateAccessToken())
	// 	if err != nil {
	// 		t.Errorf("Error in middleware: %+v\n", err)
	// 		return
	// 	}
	//
	// 	userID, err := utils.GetJwtInfoFromCtx(ctx)
	// 	if err != nil {
	// 		t.Errorf("Error in GetJwtInfoFromCtx: %+v\n", err)
	// 		return
	// 	}
	// 	if userID != testHelpers.TestUserData.UserID {
	// 		t.Errorf("Incorrect userID from middleware, want %v got %d\n", testHelpers.TestUserData.UserID, userID)
	// 		return
	// 	}
	// })

	t.Run("DropTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
