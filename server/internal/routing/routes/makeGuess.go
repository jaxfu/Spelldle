package routes

import (
	"fmt"
	"net/http"

	"spelldle.com/server/internal/routing/utils"
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
		fmt.Printf("PAYLOAD: %+v\n", payload)

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		guessID := types.GuessID{
			GameSessionID: gameSession.GameSessionID,
			Round:         gameSession.Rounds + 1,
		}

		// insert guess
		err = db.InsertGuessCategories(payload, guessID)
		if err != nil {
			fmt.Printf("Error inserting payload: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// get and insert results
		// TODO: fetch spellID from current game session and use spell
		spell, err := db.GetSpellBySpellId(gameSession.SpellID)
		if err != nil {
			fmt.Printf("error getting spell: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		results := payload.GetResults(&spell)
		if err := db.InsertGuessResults(results, guessID); err != nil {
			fmt.Printf("Error inserting guess results: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// update gameSession
		if err := db.UpdateGameSessionRounds(userID, guessID.Round); err != nil {
			fmt.Printf("error updating gameSession: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		ctx.String(http.StatusOK, "Success")
	}
}
