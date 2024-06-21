package routeHandling

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routeHandling/utils"
	"spelldle.com/server/shared/types"
)

func (r *RouteHandler) ValidateSession(ctx *gin.Context) {
	var validationResponse types.ResponseValidateSession

	userID, err := utils.GetJwtInfoFromCtx(ctx)
	if err != nil {
		fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
		ctx.JSON(http.StatusInternalServerError, validationResponse)
		return
	}
	fmt.Printf("userID: %d\n", userID)

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
	validationResponse.UserId = userID
	validationResponse.UserDataAccount = types.ResponseUserDataAccount{
		Username: userDataAccount.Username,
	}
	validationResponse.UserDataPersonal = userDataPersonal
	ctx.JSON(http.StatusOK, validationResponse)
}
