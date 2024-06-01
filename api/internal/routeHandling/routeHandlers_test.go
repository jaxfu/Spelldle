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
	//testUserLoginPayload := testHelpers.TestUserLoginPayload

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

	t.Run("RegisterValid", func(t *testing.T) {
		var responseData schemas.ResponseRegisterLogin
		if err := testHelpers.TestMakeHTTPRequest(&testUserRegisterPayload, &responseData, routeHandler.Register); err != nil {
			t.Errorf("Error making request: %+v\n", err)
		}

		if !responseData.Valid {
			t.Errorf("Invalid response, expected valid: %+v\n", responseData)
		}
	})
	//t.Run("ValidateSession_valid", func(t *testing.T) {
	//	gin.SetMode(gin.TestMode)
	//
	//	w := httptest.NewRecorder()
	//	_, router := gin.CreateTestContext(w)
	//
	//	marshalled, _ := json.Marshal(sessionData)
	//
	//	r, _ := http.NewRequest(http.MethodPost, "/api/validateSession", bytes.NewReader(marshalled))
	//	router.POST("/api/validateSession", routeHandler.ValidateSession)
	//	router.ServeHTTP(w, r)
	//
	//	var validationReponse schemas.ValidationResponse
	//	json.Unmarshal(w.Body.Bytes(), &validationReponse)
	//	if !validationReponse.Valid {
	//		t.Error("Wanted valid response, got invalid")
	//	}
	//})
	//t.Run("ValidateSession_invalid", func(t *testing.T) {
	//	gin.SetMode(gin.TestMode)
	//
	//	w := httptest.NewRecorder()
	//	_, router := gin.CreateTestContext(w)
	//
	//	marshalled, _ := json.Marshal(testHelpers.TestUserSessionDataIncorrect)
	//
	//	r, _ := http.NewRequest(http.MethodPost, "/api/validateSession", bytes.NewReader(marshalled))
	//	router.POST("/api/validateSession", routeHandler.ValidateSession)
	//	router.ServeHTTP(w, r)
	//
	//	var validationReponse schemas.ValidationResponse
	//	json.Unmarshal(w.Body.Bytes(), &validationReponse)
	//	if validationReponse.Valid {
	//		t.Error("Wanted invalid response, got valid")
	//	}
	//})
	//t.Run("Login_valid", func(t *testing.T) {
	//	gin.SetMode(gin.TestMode)
	//
	//	w := httptest.NewRecorder()
	//	_, router := gin.CreateTestContext(w)
	//
	//	marshalled, _ := json.Marshal(testHelpers.TestUserLoginPayload)
	//
	//	r, _ := http.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(marshalled))
	//	router.POST("/api/login", routeHandler.Login)
	//	router.ServeHTTP(w, r)
	//
	//	var loginResponse schemas.LoginResponse
	//	json.Unmarshal(w.Body.Bytes(), &loginResponse)
	//	if !loginResponse.Valid {
	//		t.Error("Wanted valid response, got invalid")
	//	}
	//})
	//t.Run("Login_invalid_username", func(t *testing.T) {
	//	loginPayload := schemas.RequestPayloadLogin{
	//		Username: "incorrect",
	//		Password: testHelpers.TestUserLoginPayload.Password,
	//	}
	//	gin.SetMode(gin.TestMode)
	//
	//	w := httptest.NewRecorder()
	//	_, router := gin.CreateTestContext(w)
	//
	//	marshalled, _ := json.Marshal(loginPayload)
	//
	//	r, _ := http.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(marshalled))
	//	router.POST("/api/login", routeHandler.Login)
	//	router.ServeHTTP(w, r)
	//
	//	var loginResponse schemas.LoginResponse
	//	json.Unmarshal(w.Body.Bytes(), &loginResponse)
	//	if loginResponse.Valid {
	//		t.Error("Wanted invalid response, got valid")
	//	}
	//})
	//t.Run("Login_invalid_password", func(t *testing.T) {
	//	loginPayload := schemas.RequestPayloadLogin{
	//		Username: testHelpers.TestUserLoginPayload.Username,
	//		Password: "incorrect",
	//	}
	//	gin.SetMode(gin.TestMode)
	//
	//	w := httptest.NewRecorder()
	//	_, router := gin.CreateTestContext(w)
	//
	//	marshalled, _ := json.Marshal(loginPayload)
	//
	//	r, _ := http.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(marshalled))
	//	router.POST("/api/login", routeHandler.Login)
	//	router.ServeHTTP(w, r)
	//
	//	var loginResponse schemas.LoginResponse
	//	json.Unmarshal(w.Body.Bytes(), &loginResponse)
	//	if loginResponse.Valid {
	//		t.Error("Wanted invalid response, got valid")
	//	}
	//})

	//t.Run("DropTables", func(t *testing.T) {
	//	if err := db.ExecuteSqlScript(os.Getenv("SQL_DROP_TABLES")); err != nil {
	//		t.Errorf("Error dropping tables: %+v\n", err)
	//	}
	//})
}
