package testHelpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"

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
