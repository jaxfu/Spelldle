package testHelpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/shared/types"
)

type emptyStruct struct {
	A string
}

var nilUrl = ""

func TestMiddleware(tokens types.AllTokens, middleware gin.HandlerFunc) (*gin.Context, error) {
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	ctx, router := gin.CreateTestContext(w)

	marshalled, err := json.Marshal(emptyStruct{A: ""})
	if err != nil {
		return ctx, fmt.Errorf("error marshalling payload: %+vn", err)
	}

	r, err := http.NewRequest(http.MethodPost, nilUrl, bytes.NewReader(marshalled))
	if err != nil {
		return ctx, fmt.Errorf("error creating request: %+v", err)
	}
	r.Header.Set(consts.HeaderTypeAuthorization, fmt.Sprintf("%s%s", consts.BearerTokenPrefix, tokens.AccessToken.AccessToken))
	fmt.Printf("HEADER: %+v\n", r.Header.Get(consts.HeaderTypeAuthorization))
	router.Use(middleware)
	router.POST("/", func(c *gin.Context) {
		// This handler does nothing but ensures the middleware gets executed
	})
	router.ServeHTTP(w, r)

	return ctx, nil
}
