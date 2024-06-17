package routeHandling

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"spelldle.com/server/internal/routeHandling/middleware"
	"spelldle.com/server/internal/testHelpers"
)

func TestRouteHandlers(t *testing.T) {
	if err := godotenv.Load("../../../config/config.env"); err != nil {
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
			"/api/register",
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
		var responseData types.ResponseRegisterLogin
		if err := testHelpers.TestPostRequest(
			"/api/login",
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
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequest(
			"/api/login",
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
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequest(
			"/api/login",
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
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequest(
			"/api/validateSession",
			&testUserDataTokens,
			&responseData,
			routeHandler.ValidateSession,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
		if responseData.UserId != testHelpers.TestUserDataAll.UserID {
			t.Errorf("First name is incorrect: got %d, want %d\n", responseData.UserId, testHelpers.TestUserDataAll.UserID)
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
		var responseData types.ResponseRegisterLogin

		if err := testHelpers.TestPostRequest(
			"/api/validateSession",
			&types.AccessToken{
				AccessToken: "test",
			},
			&responseData,
			routeHandler.ValidateSession,
		); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if responseData.Valid {
			t.Errorf("Valid response, expected invalid: %+v\n", responseData)
		}
	})

	t.Run("ValidateJWTMiddlewareValid", func(t *testing.T) {
		marshalled, err := json.Marshal(testUserDataTokens)
		if err != nil {
			t.Errorf("error marshalling payload: %+v", err)
		}

		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		ctx, _ := gin.CreateTestContext(w)

		r, err := http.NewRequest(http.MethodPost, "validate middleware", bytes.NewReader(marshalled))
		if err != nil {
			t.Errorf("error creating request: %+v", err)
		}

		// Assign the request to the context
		ctx.Request = r

		// Call the route handler directly
		middleware.ValidateAccessToken()(ctx)

		v, e := ctx.Get("user_id")

		fmt.Printf("ctx exists: %+v\n", e)
		fmt.Printf("ctx value: %+s\n", v)
	})

	t.Run("DropTables", func(t *testing.T) {
		if err := db.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
			t.Errorf("Error dropping tables: %+v\n", err)
		}
	})
}
