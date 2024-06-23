package routes

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/jackc/pgx/v5"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"

	"github.com/gin-gonic/gin"
)

// Register recieves a RequestPayloadRegister, then checks if the username is valid,
// inserts into user_info, generates UserDataSession, then sends a ResponseRegisterLogin
func Register(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var registerPayload types.RequestPayloadRegister
		registerResponse := types.ResponseRegisterLogin{
			Valid: false,
		}

		// Bind request body
		if err := ctx.BindJSON(&registerPayload); err != nil {
			fmt.Printf("Error binding json: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			return
		}
		fmt.Printf("%+v\n", registerPayload)

		// Check if username currently exists
		_, err := db.GetUserIDByUsername(registerPayload.Username)
		if err != nil {
			if !errors.Is(err, pgx.ErrNoRows) {
				fmt.Printf("Error checking username validity: %+v\n", err)
				ctx.JSON(http.StatusInternalServerError, registerResponse)
				return
			}
		} else {
			fmt.Printf("Username '%s' already exists", registerPayload.Username)
			ctx.JSON(http.StatusUnauthorized, registerResponse)
			return
		}

		// Insert User
		userID, err := db.InsertUser()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			fmt.Printf("Error inserting user: %+v\n", err)
			return
		}

		// Insert UserDataAccount
		if err := db.InsertUserDataAccount(userID,
			types.UserDataAccount{
				Username: registerPayload.Username,
				Password: registerPayload.Password,
			}); err != nil {
			fmt.Printf("Error in InsertUserDataAccount during POST->register: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			return
		}

		// Insert UserDataPersonal
		if err := db.InsertUserDataPersonal(userID,
			types.UserDataPersonal{
				FirstName: registerPayload.FirstName,
				LastName:  registerPayload.LastName,
			}); err != nil {
			fmt.Printf("Error in InsertUserDataPersonal during POST->register: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			return
		}

		accessToken, err := auth.CreateJWTFromUserID(userID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			return
		}

		// Get UserDataAccount
		userDataAccount, err := db.GetUserDataAccountByUserID(userID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			fmt.Printf("Error getting UserDataAccount during POST->register: %+v\n", err)
			return
		}

		// Get UserDataPersonal
		userDataPersonal, err := db.GetUserDataPersonalByUserID(userID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			fmt.Printf("Error getting GetUserDataPersonalByUserID during POST->register: %+v\n", err)
			return
		}

		registerResponse = utils.CreateResponseRegisterLogin(
			true,
			userID,
			userDataAccount,
			userDataPersonal,
			types.AllTokens{
				AccessToken:  types.AccessToken{AccessToken: accessToken},
				RefreshToken: types.RefreshToken{RefreshToken: accessToken},
			},
		)

		ctx.JSON(http.StatusCreated, registerResponse)

		// Backup
		//cmd := exec.Command("./backup.sh")
		//if err := cmd.Run(); err != nil {
		//	log.Printf("cError backing up Postgres: %+v\n", err)
		//}
	}
}
