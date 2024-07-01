package routes

import (
	"fmt"
	"net/http"

	"spelldle.com/server/shared/dbHandler"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/types"
)

func ValidateSession(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var validationResponse types.ResponseValidateSession

		// Get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, validationResponse)
			return
		}
		fmt.Printf("userID: %d\n", userID)

		// Get UserDataAll
		userDataAll, err := db.GetUserDataAllByUserID(userID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, validationResponse)
			fmt.Printf("Error getting UserDataAccount during POST->login: %+v\n", err)
			return
		}

		validationResponse.Valid = true
		validationResponse.UserDataAll = userDataAll
		ctx.JSON(http.StatusOK, validationResponse)
	}
}
