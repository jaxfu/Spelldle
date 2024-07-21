package routes

import (
	"fmt"
	"net/http"

	"spelldle.com/server/internal/routing/utils"
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
		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// bind payload
		var payload types.GuessCategories
		err = ctx.BindJSON(&payload)
		if err != nil {
			fmt.Printf("Error binding payload: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		fmt.Printf("PAYLOAD: %v\n", payload)

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		fmt.Printf("%+v\n", gameSession)

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
		if err := db.InsertGuessResults(results); err != nil {
			fmt.Printf("Error inserting guess results: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// update gameSession
		if err := db.UpdateGameSessionRounds(userID, payload.Round); err != nil {
			fmt.Printf("error updating gameSession: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		ctx.String(http.StatusOK, "Success")
	}
}
