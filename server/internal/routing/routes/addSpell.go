package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

// TODO: create enum for roles
const ADMIN string = "A"

func AddSpell(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// bind payload
		var payload types.SpellAll
		err = ctx.BindJSON(&payload)
		if err != nil {
			fmt.Printf("error binding payload: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		fmt.Printf("PAYLOAD: %+v\n", payload)

		// get user role
		userData, err := db.GetUserDataByUserID(userID)
		if err != nil {
			fmt.Printf("error in GetUserDataByUserID %+v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		if userData.Role != ADMIN {
			fmt.Printf("user %s is not admin, cannot add spell", userData.Username)
			ctx.Status(http.StatusUnauthorized)
			return
		}

		err = db.InsertSpell(payload)
		if err != nil {
			fmt.Printf("error in InsertSpell %+v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
	}
}
