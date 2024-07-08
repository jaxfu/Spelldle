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
		var response types.ResponseGetGuesses

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// get game_session
		game_session, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("error in GetGameSessionByUserID %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		response.GameSessionID = game_session.GameSessionID

		// get guesses
		guesses, err := db.GetAllGuessCategoriesByUserID(userID)
		if err != nil {
			fmt.Printf("error getting guesses %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// get results
		results, err := db.GetAllGuessResultsByUserID(userID)
		if err != nil {
			fmt.Printf("error getting results %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// sanity check
		if len(guesses) != len(results) || len(guesses) != int(game_session.Rounds) || len(results) != int(game_session.Rounds) {
			fmt.Printf("length equality check failed: rounds: %d, guesses: %+v, results: %+v\n", game_session.Rounds, guesses, results)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		for i := range int(game_session.Rounds) {
			fmt.Printf("round %d\n", i)
			guessAll := types.GuessAll{
				GuessID: types.GuessID{
					GameSessionID: game_session.GameSessionID,
					Round:         uint(i + 1),
				},
				Categories: guesses[i].SpellCategories,
				Results:    results[i],
			}

			response.Guesses = append(response.Guesses, guessAll)
		}

		ctx.JSON(http.StatusOK, response)
	}
}
