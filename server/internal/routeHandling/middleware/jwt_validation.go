package middleware

import (
	"errors"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

var (
	CTX_KEY_VALID  string = "valid"
	CTX_KEY_USERID string = "user_id"
)

func ValidateAccessToken(dbHandler *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if ctx.Request.Method == "POST" {
			if ctx.Request.URL.Path == "/api/login" || ctx.Request.URL.Path == "/api/register" {
				fmt.Println("POST login or register detected, skipping middleware")
				ctx.Next()
				return
			}
		}

		var validationPayload types.AccessToken

		// Bind request body
		//
		if err := ctx.BindJSON(&validationPayload); err != nil {
			fmt.Printf("Error binding validationPayload json: %+v\n", err)
			ctx.Set(CTX_KEY_VALID, false)
			ctx.Next()
			return
		}
		fmt.Printf("%+v\n", validationPayload)

		token, err := auth.ParseAndValidateJWT(validationPayload.AccessToken, []byte(os.Getenv("JWT_SECRET")))
		if err != nil {
			if errors.Is(err, jwt.ErrTokenMalformed) {
				fmt.Printf("%+v\n", err)
			} else {
				fmt.Printf("Error parsing token: %+v\n", err)
			}
			ctx.Set(CTX_KEY_VALID, false)
			ctx.Next()
			return
		}

		userIdAsString, err := token.Claims.GetSubject()
		if err != nil {
			ctx.Set(CTX_KEY_VALID, false)
			fmt.Printf("Error getting subject claim from token: %+v\n", err)
			ctx.Next()
			return
		}
		fmt.Printf("SUB: %+v\n", userIdAsString)
		expiry, err := token.Claims.GetExpirationTime()
		if err != nil {
			fmt.Printf("error getting expiry: %+v\n", err)
		} else {
			fmt.Printf("EXPIRY: %+v\n", expiry)
		}

		ctx.Set(CTX_KEY_VALID, true)
		ctx.Set(CTX_KEY_USERID, userIdAsString)
		ctx.Next()
	}
}
