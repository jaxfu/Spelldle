package routeHandling

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/schemas"
)

func (r *RouteHandler) Login(ctx *gin.Context) {
	var loginPayload schemas.LoginPayload
	var loginResponse = schemas.LoginResponse{
		Valid: false,
	}

	// Bind loginPayload
	if err := ctx.BindJSON(&loginPayload); err != nil {
		fmt.Printf("Error binding json: %+v\n", err)
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}
	fmt.Printf("Login Payload: %+v\n", loginPayload)

	// Check if username exists
	exists, err := r.dbHandler.CheckIfUsernameExists(loginPayload.Username)
	if err != nil {
		fmt.Printf("Error in CheckIfUsernameExists: %+v\n", err)
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}
	if !exists {
		fmt.Printf("Username '%s' does not exist", loginPayload.Username)
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}

	// Get basic user data
	userData, err := r.dbHandler.GetUserAccountInfoByUsername(loginPayload.Username)
	if err != nil {
		fmt.Printf("Error in GetBasicUserInfoByUsername: %+v\n", err)
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}

	if loginPayload.Password != userData.Password {
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}

	// Get session data
	sessionData, err := r.dbHandler.GetUserSessionDataByUserID(userData.UserID)
	if err != nil {
		fmt.Printf("Error retrieving session data: %+v\n", err)
		ctx.JSON(http.StatusOK, loginResponse)
		return
	}

	loginResponse.UserData.UserID = userData.UserID
	loginResponse.UserData.Username = userData.Username
	loginResponse.UserData.FirstName = userData.FirstName
	loginResponse.UserData.LastName = userData.LastName
	loginResponse.SessionKey = sessionData.SessionKey
	loginResponse.Valid = true

	ctx.JSON(http.StatusOK, loginResponse)
}
