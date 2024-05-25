package routeHandling

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"spelldle.com/server/internal/schemas"
	"spelldle.com/server/internal/userHandlers"
)

// Register recieves a RegisterPayload, then checks if the username is valid,
// inserts into user_info, generates UserSessionData, then sends a RegisterResponse
func (r *RouteHandler) Register(ctx *gin.Context) {
	var registerPayload schemas.RegisterPayload
	registerResponse := schemas.RegisterResponse{
		Valid: false,
	}

	// Bind request body
	if err := ctx.BindJSON(&registerPayload); err != nil {
		fmt.Printf("Error binding json: %+v\n", err)
		ctx.String(http.StatusNotFound, "Error")
		return
	}
	fmt.Printf("%+v\n", registerPayload)

	// Check if username currently exists
	exists, err := r.dbHandler.CheckIfUsernameExists(registerPayload.Username)
	if err != nil {
		fmt.Printf("Error checking username validity: %+v\n", err)
		ctx.String(http.StatusNotFound, "Error")
		return
	}
	if exists {
		fmt.Printf("Username '%s' already exists", registerPayload.Username)
		ctx.JSON(http.StatusOK, registerResponse)
		return
	}

	// Insert into user_info
	if err := r.dbHandler.InsertUserRegisterInfo(registerPayload); err != nil {
		fmt.Printf("Error inserting user from /register: %+v\n", err)
		ctx.String(http.StatusNotFound, "Error inserting new user")
		return
	}

	// Get UserID from newly inserted user
	id, err := r.dbHandler.GetUserIDByUsername(registerPayload.Username)
	if err != nil {
		fmt.Printf("Error searching for newly inserted user: %+v\n", err)
		ctx.String(http.StatusNotFound, "Error inserting new user")
		return
	}

	// Generate and insert Session Data
	sessionData := userHandlers.GenerateNewUserSessionData(id)
	if err := r.dbHandler.InsertUserSessionData(sessionData); err != nil {
		fmt.Printf("Error inserting session data: %+v\n", err)
		ctx.String(http.StatusNotFound, "Error generating and inserting session data")
		return
	}
	registerResponse.SessionKey = sessionData.SessionKey

	//Get all new user data
	userData, err := r.dbHandler.GetUserAccountInfoByUsername(registerPayload.Username)
	if err != nil {
		fmt.Printf("Error retrieving new user information: %+v\n", err)
		ctx.String(http.StatusNotFound, "Error retrieving new user data afer insertion")
		return
	}
	registerResponse.UserData.UserID = userData.UserID
	registerResponse.UserData.Username = userData.Username
	registerResponse.UserData.FirstName = userData.FirstName
	registerResponse.UserData.LastName = userData.LastName

	registerResponse.Valid = true

	ctx.JSON(http.StatusOK, registerResponse)

	// Backup
	//cmd := exec.Command("./backup.sh")
	//if err := cmd.Run(); err != nil {
	//	log.Printf("cError backing up Postgres: %+v\n", err)
	//}
}
