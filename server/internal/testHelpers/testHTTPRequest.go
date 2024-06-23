package testHelpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/internal/routing/middleware"
	"spelldle.com/server/shared/types"

	"github.com/gin-gonic/gin"
)

func TestPostRequest[P any, R any](route string, payload *P, response *R, routeHandler func(ctx *gin.Context)) error {
	marshalled, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("error marshalling payload: %+vn", err)
	}

	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	_, router := gin.CreateTestContext(w)

	r, err := http.NewRequest(http.MethodPost, route, bytes.NewReader(marshalled))
	if err != nil {
		return fmt.Errorf("error creating request: %+v", err)
	}
	router.POST(route, routeHandler)
	router.ServeHTTP(w, r)

	err = json.Unmarshal(w.Body.Bytes(), response)
	if err != nil {
		return fmt.Errorf("error unmarshalling response: %+v", err)
	}

	return nil
}

func TestPostRequestWithAuthTokens[P any, R any](route string, payload *P, response *R, routeHandler func(ctx *gin.Context), tokens types.AllTokens) error {
	marshalled, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("error marshalling payload: %+vn", err)
	}

	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	_, router := gin.CreateTestContext(w)

	r, err := http.NewRequest(http.MethodPost, route, bytes.NewReader(marshalled))
	if err != nil {
		return fmt.Errorf("error creating request: %+v", err)
	}
	r.Header.Set(consts.HeaderTypeAuthorization, fmt.Sprintf("%s%s", consts.BearerTokenPrefix, tokens.AccessToken.AccessToken))
	fmt.Printf("HEADER: %+v\n", r.Header.Get(consts.HeaderTypeAuthorization))
	router.Use(middleware.ValidateAccessToken())
	router.POST(route, routeHandler)
	router.ServeHTTP(w, r)

	err = json.Unmarshal(w.Body.Bytes(), response)
	if err != nil {
		return fmt.Errorf("error unmarshalling response: %+v", err)
	}

	return nil
}
