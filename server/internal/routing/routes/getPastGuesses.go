package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

func GetPastGuesses(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// var response types.ResponseGetGuesses
		var response []types.GuessAll

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		allGuessAll, err := db.GetAllGuessAllByUserID(userID)
		if err != nil {
			fmt.Printf("error getting all guesses %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		ctx.JSON(http.StatusOK, allGuessAll)
	}
}
