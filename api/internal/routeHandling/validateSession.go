package routeHandling

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/internal/schemas"
	"strconv"
)

func (r *RouteHandler) ValidateSession(ctx *gin.Context) {
	var validationPayload schemas.RequestPayloadValidateSession
	validationResponse := schemas.ResponseValidateSession{
		Valid: false,
	}

	// Bind request body
	if err := ctx.BindJSON(&validationPayload); err != nil {
		fmt.Printf("Error binding validationPayload json: %+v\n", err)
		ctx.JSON(http.StatusOK, validationResponse)
		return
	}
	fmt.Printf("%+v\n", validationPayload)

	token, err := auth.ParseAndValidateJWT(validationPayload.AccessToken, []byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		if errors.Is(err, jwt.ErrTokenMalformed) {
			fmt.Printf("Token is malformed: %+v\n", err)
		} else {
			fmt.Printf("Error parsing token: %+v\n", err)
		}
		ctx.JSON(http.StatusInternalServerError, validationResponse)
		return
	}

	userIdAsString, err := token.Claims.GetSubject()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, validationResponse)
		fmt.Printf("Error getting subject claim from token: %+v\n", err)
		return
	}
	fmt.Printf("SUB: %+v\n", userIdAsString)
	expiry, err := token.Claims.GetExpirationTime()
	fmt.Printf("EXPIRY: %+v\n", expiry)

	userID64, err := strconv.ParseUint(userIdAsString, 10, 64)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, validationResponse)
		fmt.Printf("Error getting userId from token: %+v\n", err)
		return
	}
	userID := schemas.UserID(uint(userID64))

	// Get UserDataAccount
	userDataAccount, err := r.dbHandler.GetUserDataAccountByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, validationResponse)
		fmt.Printf("Error getting UserDataAccount during POST->validateSession: %+v\n", err)
		return
	}

	// Get UserDataPersonal
	userDataPersonal, err := r.dbHandler.GetUserDataPersonalByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, validationResponse)
		fmt.Printf("Error getting GetUserDataPersonalByUserID during POST->validateSession: %+v\n", err)
		return
	}

	validationResponse.Valid = true
	validationResponse.UserDataAccount = schemas.ResponseUserDataAccount{
		Username: userDataAccount.Username,
	}
	validationResponse.UserDataPersonal = userDataPersonal
	ctx.JSON(http.StatusOK, validationResponse)
}
