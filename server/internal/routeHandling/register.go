package routeHandling

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"net/http"
	"spelldle.com/server/internal/auth"
	types2 "spelldle.com/server/types"
)

// Register recieves a RequestPayloadRegister, then checks if the username is valid,
// inserts into user_info, generates UserDataSession, then sends a ResponseRegisterLogin
func (r *RouteHandler) Register(ctx *gin.Context) {
	var registerPayload types2.RequestPayloadRegister
	registerResponse := types2.ResponseRegisterLogin{
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
	_, err := r.dbHandler.GetUserIDByUsername(registerPayload.Username)
	if err != nil {
		if !errors.Is(err, pgx.ErrNoRows) {
			fmt.Printf("Error checking username validity: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, registerResponse)
			return
		}
	} else {
		fmt.Printf("Username '%s' already exists", registerPayload.Username)
		ctx.JSON(http.StatusOK, registerResponse)
		return
	}

	// Insert User
	userID, err := r.dbHandler.InsertUser()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, registerResponse)
		fmt.Printf("Error inserting user: %+v\n", err)
		return
	}

	// Insert UserDataAccount
	if err := r.dbHandler.InsertUserDataAccount(userID,
		types2.UserDataAccount{
			Username: registerPayload.Username,
			Password: registerPayload.Password,
		}); err != nil {
		fmt.Printf("Error in InsertUserDataAccount during POST->register: %+v\n", err)
		ctx.JSON(http.StatusInternalServerError, registerResponse)
		return
	}

	// Insert UserDataPersonal
	if err := r.dbHandler.InsertUserDataPersonal(userID,
		types2.UserDataPersonal{
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
	userDataAccount, err := r.dbHandler.GetUserDataAccountByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, registerResponse)
		fmt.Printf("Error getting UserDataAccount during POST->register: %+v\n", err)
		return
	}

	// Get UserDataPersonal
	userDataPersonal, err := r.dbHandler.GetUserDataPersonalByUserID(userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, registerResponse)
		fmt.Printf("Error getting GetUserDataPersonalByUserID during POST->register: %+v\n", err)
		return
	}

	registerResponse = CreateResponseRegisterLogin(
		true,
		userID,
		userDataAccount,
		userDataPersonal,
		types2.UserDataTokens{
			AccessToken:  accessToken,
			RefreshToken: accessToken,
		},
	)

	ctx.JSON(http.StatusOK, registerResponse)

	// Backup
	//cmd := exec.Command("./backup.sh")
	//if err := cmd.Run(); err != nil {
	//	log.Printf("cError backing up Postgres: %+v\n", err)
	//}
}
