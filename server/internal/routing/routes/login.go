package routes

import (
	"errors"
	"fmt"
	"net/http"

	"spelldle.com/server/shared/dbHandler"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/shared/types"
)

func Login(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var loginPayload types.RequestPayloadLogin
		loginResponse := types.ResponseRegisterLogin{
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
		userID, err := db.GetUserIDByUsername(loginPayload.Username)
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

		// Get UserData
		userData, err := db.GetUserDataByUserID(userID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, loginResponse)
			fmt.Printf("Error getting UserData during POST->login: %+v\n", err)
			return
		}

		// Check password
		if loginPayload.Password != userData.Password {
			fmt.Printf("Password does not match: got %s, want %s\n", loginPayload.Password, userData.Password)
			ctx.JSON(http.StatusOK, loginResponse)
			return
		}

		loginResponse = types.ResponseRegisterLogin{
			Valid: true,
			Tokens: types.AllTokens{
				AccessToken:  types.AccessToken{AccessToken: accessToken},
				RefreshToken: types.RefreshToken{RefreshToken: accessToken},
			},
			UserData: types.ResponseUserData{
				FirstName: userData.FirstName,
				LastName:  userData.LastName,
				Username:  userData.Username,
				UserID:    userID,
			},
		}

		ctx.JSON(http.StatusOK, loginResponse)
	}
}
