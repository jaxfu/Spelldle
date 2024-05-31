package routeHandling

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/schemas"
)

func (r *RouteHandler) ValidateSession(ctx *gin.Context) {
	var validationPayload schemas.ValidationPayload
	validationResponse := schemas.ValidationResponse{
		Valid: false,
	}

	// Bind request body
	if err := ctx.BindJSON(&validationPayload); err != nil {
		fmt.Printf("Error binding validationPayload json: %+v\n", err)
		ctx.JSON(http.StatusOK, validationResponse)
		return
	}
	fmt.Printf("%+v\n", validationPayload)

	userSessionData, err := r.dbHandler.GetUserSessionDataByUserID(validationPayload.UserID)
	if err != nil {
		fmt.Printf("Error getting user session data: %+v\n", err)
		ctx.JSON(http.StatusOK, validationResponse)
		return
	}

	if userSessionData.SessionKey != validationPayload.SessionKey {
		ctx.JSON(http.StatusOK, validationResponse)
		return
	}

	// Get basic user info
	userData, err := r.dbHandler.GetUserAccountInfoByUserID(validationPayload.UserID)
	if err != nil {
		fmt.Printf("Error searching for user data: %+v\n", err)
		ctx.JSON(http.StatusOK, validationResponse)
		return
	}
	validationResponse.UserData.UserID = userData.UserID
	validationResponse.UserData.Username = userData.Username
	validationResponse.UserData.FirstName = userData.FirstName
	validationResponse.UserData.LastName = userData.LastName

	validationResponse.Valid = true
	ctx.JSON(http.StatusOK, validationResponse)
}
