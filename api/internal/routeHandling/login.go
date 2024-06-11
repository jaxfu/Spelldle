package routeHandling

import (
	"errors"
	"fmt"
	"github.com/jackc/pgx/v5"
	"net/http"
	"spelldle.com/server/internal/auth"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/types"
)

func (r *RouteHandler) Login(ctx *gin.Context) {
	var loginPayload types.RequestPayloadLogin
	var loginResponse = types.ResponseRegisterLogin{
		Valid: false,
	}

	// Bind loginPayload
	if err := ctx.BindJSON(&loginPayload); err != nil {
		fmt.Printf("Error binding json: %+v\n", err)
		ctx.JSON(http.StatusInternalServerError, loginResponse)
		return
	}
	fmt.Printf("Login Payload: %+v\n", loginPayload)

	// Check if username exists
	userID, err := r.dbHandler.GetUserIDByUsername(loginPayload.Username)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			fmt.Printf("Username does not exist: %+v\n", err)
			ctx.JSON(http.StatusOK, loginResponse)
		} else {
			fmt.Printf("Error in GetUserIDByUsername during POST->login: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, loginResponse)
		}

		return
	}

	accessToken, err := auth.CreateJWTFromUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, loginResponse)
		return
	}

	// Get UserDataAccount
	userDataAccount, err := r.dbHandler.GetUserDataAccountByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, loginResponse)
		fmt.Printf("Error getting UserDataAccount during POST->login: %+v\n", err)
		return
	}

	// Check password
	if loginPayload.Password != userDataAccount.Password {
		fmt.Printf("Password does not match: got %s, want %s\n", loginPayload.Password, userDataAccount.Password)
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}

	// Get UserDataPersonal
	userDataPersonal, err := r.dbHandler.GetUserDataPersonalByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, loginResponse)
		fmt.Printf("Error getting GetUserDataPersonalByUserID during POST->login: %+v\n", err)
		return
	}

	loginResponse = CreateResponseRegisterLogin(
		true,
		userID,
		userDataAccount,
		userDataPersonal,
		types.UserDataTokens{
			AccessToken:  accessToken,
			RefreshToken: accessToken,
		},
	)

	ctx.JSON(http.StatusOK, loginResponse)
}
