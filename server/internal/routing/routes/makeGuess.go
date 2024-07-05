package routes

import (
	"fmt"
	"net/http"

	"spelldle.com/server/internal/testHelpers"
	"spelldle.com/server/shared/dbHandler"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/shared/types"
)

// SPELL RESULTS:
// 0 = Incorrect
// 1 = Some Correct
// 2 = Correct

func MakeGuess(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// TODO: get current game_session_id for user
		// get userID from jwt
		// userId, err := utils.GetJwtInfoFromCtx(ctx)
		// if err != nil {
		// 	fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
		// 	ctx.Status(http.StatusInternalServerError)
		// 	return
		// }

		// bind payload
		var payload types.GuessCategories
		err := ctx.BindJSON(&payload)
		if err != nil {
			fmt.Printf("Error binding payload: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		fmt.Printf("PAYLOAD: %v\n", payload)

		// insert guess
		err = db.InsertGuessCategories(payload)
		if err != nil {
			fmt.Printf("Error inserting payload: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// insert results
		results := payload.GetResults(&testHelpers.TestSpell.SpellCategories)
		results.GuessID = payload.GuessID
		err = db.InsertGuessResults(results)
		if err != nil {
			fmt.Printf("Error inserting guess results: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		ctx.Status(http.StatusOK)
	}
}
