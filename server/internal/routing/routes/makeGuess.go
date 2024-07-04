package routes

import (
	"fmt"
	"net/http"

	"spelldle.com/server/shared/dbHandler"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/types"
)

// SPELL RESULTS:
// 0 = Incorrect
// 1 = Some Correct
// 2 = Correct

func MakeGuess(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var response types.GuessResults

		userId, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		fmt.Printf("userID: %d\n", userId)

		var payload types.SpellCategories
		if err := ctx.BindJSON(&payload); err != nil {
			fmt.Printf("Error binding payload: %v\n", err)
			ctx.String(http.StatusInternalServerError, "Invalid payload")
			return
		}
		fmt.Printf("PAYLOAD: %v\n", payload)

		// Get spell to compare (hardwired for now)
		// TODO: pull in currentSpell from users.currentGameData
		spell, err := db.GetSpellBySpellId(1)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		response = ctx.JSON(http.StatusOK, response)
	}
}
