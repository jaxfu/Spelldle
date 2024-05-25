package routeHandling

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"spelldle.com/server/internal/testHelpers"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"spelldle.com/server/internal/dbHandler"
	"spelldle.com/server/internal/schemas"
)

//goland:noinspection GoUnhandledErrorResult
func TestRouteHandlers(t *testing.T) {
	var sessionData schemas.UserSessionData

	if err := godotenv.Load("../../config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	db := dbHandler.InitDBHandler(os.Getenv("DB_URL_TEST"))
	routeHandler := InitRouteHandler(db)
	defer routeHandler.dbHandler.DB.Close()

	t.Run("Register", func(t *testing.T) {
		if err := db.CreateTables(); err != nil {
			t.Errorf("Error creating tables: %+v\n", err)
		}

		registerPayload := testHelpers.TestRegisterPayload

		marshalled, _ := json.Marshal(registerPayload)

		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		_, router := gin.CreateTestContext(w)

		r, _ := http.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(marshalled))
		router.POST("/api/register", routeHandler.Register)
		router.ServeHTTP(w, r)

		var responseData schemas.RegisterResponse
		json.Unmarshal(w.Body.Bytes(), &responseData)

		if responseData.UserData.Username != registerPayload.Username {
			t.Errorf("Username mismatch after inserting new user, got %s, want %s", responseData.UserData.Username, registerPayload.Username)
		}

		var err error
		sessionData, err = db.GetUserSessionDataByUserID(testHelpers.TestUserAccountData.UserID)
		if err != nil {
			t.Errorf("Error retrieving registered session data")
		}
	})
	t.Run("ValidateSession_valid", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		_, router := gin.CreateTestContext(w)

		marshalled, _ := json.Marshal(sessionData)

		r, _ := http.NewRequest(http.MethodPost, "/api/validateSession", bytes.NewReader(marshalled))
		router.POST("/api/validateSession", routeHandler.ValidateSession)
		router.ServeHTTP(w, r)

		var validationReponse schemas.ValidationResponse
		json.Unmarshal(w.Body.Bytes(), &validationReponse)
		if !validationReponse.Valid {
			t.Error("Wanted valid response, got invalid")
		}
	})
	t.Run("ValidateSession_invalid", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		_, router := gin.CreateTestContext(w)

		marshalled, _ := json.Marshal(testHelpers.TestUserSessionDataIncorrect)

		r, _ := http.NewRequest(http.MethodPost, "/api/validateSession", bytes.NewReader(marshalled))
		router.POST("/api/validateSession", routeHandler.ValidateSession)
		router.ServeHTTP(w, r)

		var validationReponse schemas.ValidationResponse
		json.Unmarshal(w.Body.Bytes(), &validationReponse)
		if validationReponse.Valid {
			t.Error("Wanted invalid response, got valid")
		}
	})
	t.Run("Login_valid", func(t *testing.T) {
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		_, router := gin.CreateTestContext(w)

		marshalled, _ := json.Marshal(testHelpers.TestUserLoginPayload)

		r, _ := http.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(marshalled))
		router.POST("/api/login", routeHandler.Login)
		router.ServeHTTP(w, r)

		var loginResponse schemas.LoginResponse
		json.Unmarshal(w.Body.Bytes(), &loginResponse)
		if !loginResponse.Valid {
			t.Error("Wanted valid response, got invalid")
		}
	})
	t.Run("Login_invalid_username", func(t *testing.T) {
		loginPayload := schemas.LoginPayload{
			Username: "incorrect",
			Password: testHelpers.TestUserLoginPayload.Password,
		}
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		_, router := gin.CreateTestContext(w)

		marshalled, _ := json.Marshal(loginPayload)

		r, _ := http.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(marshalled))
		router.POST("/api/login", routeHandler.Login)
		router.ServeHTTP(w, r)

		var loginResponse schemas.LoginResponse
		json.Unmarshal(w.Body.Bytes(), &loginResponse)
		if loginResponse.Valid {
			t.Error("Wanted invalid response, got valid")
		}
	})
	t.Run("Login_invalid_password", func(t *testing.T) {
		loginPayload := schemas.LoginPayload{
			Username: testHelpers.TestUserLoginPayload.Username,
			Password: "incorrect",
		}
		gin.SetMode(gin.TestMode)

		w := httptest.NewRecorder()
		_, router := gin.CreateTestContext(w)

		marshalled, _ := json.Marshal(loginPayload)

		r, _ := http.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(marshalled))
		router.POST("/api/login", routeHandler.Login)
		router.ServeHTTP(w, r)

		var loginResponse schemas.LoginResponse
		json.Unmarshal(w.Body.Bytes(), &loginResponse)
		if loginResponse.Valid {
			t.Error("Wanted invalid response, got valid")
		}
	})
	if err := db.DropTables(); err != nil {
		t.Errorf("Error dropping tables: %+v\n", err)
	}
}
