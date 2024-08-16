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
		var response types.ResponsePastGuesses

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("error getting game session %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		var guesses []types.PastGuessesAll
		for i := range gameSession.Rounds {
			guessID := types.GuessID{
				GameSessionID: gameSession.GameSessionID,
				Round:         (i + 1),
			}
			results, err := db.GetGuessResultsByGuessID(guessID)
			if err != nil {
				fmt.Printf("error getting results %+v\n", err)
				ctx.JSON(http.StatusInternalServerError, response)
				return
			}
			values, err := db.GetGuessCategoriesByGuessID(guessID)
			if err != nil {
				fmt.Printf("error getting values %+v\n", err)
				ctx.JSON(http.StatusInternalServerError, response)
				return
			}

			guess := types.PastGuessesAll{
				Round:       (i + 1),
				Components:  types.PastGuessesMulti{Value: values.Components, Result: results.Components},
				Class:       types.PastGuessesMulti{Value: values.Class, Result: results.Class},
				Effects:     types.PastGuessesMulti{Value: values.Effects, Result: results.Effects},
				Level:       types.PastGuessesLevel{Value: values.Level, Result: results.Level},
				School:      types.PastGuessesSingle{Value: values.School, Result: results.School},
				CastingTime: types.PastGuessesSingle{Value: values.CastingTime, Result: results.CastingTime},
				Range:       types.PastGuessesSingle{Value: values.Range, Result: results.Range},
				Target:      types.PastGuessesSingle{Value: values.Target, Result: results.Target},
				Duration:    types.PastGuessesSingle{Value: values.Duration, Result: results.Duration},
			}

			guesses = append(guesses, guess)
		}

		// allGuessAll, err := db.GetAllGuessAllByUserID(userID)
		// if err != nil {
		// 	fmt.Printf("error getting all guesses %+v\n", err)
		// 	ctx.JSON(http.StatusInternalServerError, response)
		// 	return
		// }

		response.GameSession = types.ResponseGameSessionData{
			GameSessionID: gameSession.GameSessionID,
			CurrentRound:  gameSession.Rounds + 1,
		}
		response.Guesses = guesses

		ctx.JSON(http.StatusOK, response)
	}
}

//
// func GetPastGuesses(db *dbHandler.DBHandler) gin.HandlerFunc {
// 	return func(ctx *gin.Context) {
// 		var response []types.GuessAll
//
// 		// get userID from jwt
// 		userID, err := utils.GetJwtInfoFromCtx(ctx)
// 		if err != nil {
// 			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
// 			ctx.JSON(http.StatusInternalServerError, response)
// 			return
// 		}
//
// 		allGuessAll, err := db.GetAllGuessAllByUserID(userID)
// 		if err != nil {
// 			fmt.Printf("error getting all guesses %+v\n", err)
// 			ctx.JSON(http.StatusInternalServerError, response)
// 			return
// 		}
//
// 		ctx.JSON(http.StatusOK, allGuessAll)
// 	}
// }
