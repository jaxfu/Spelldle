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

		// get guess categories and results
		guesses, err := getPastGuessesCategoriesByUserID(userID, db)
		if err != nil {
			fmt.Printf("error in getPastGuessesCategoriesByUserID %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
		}

		// get spells

		response.Guesses = guesses

		ctx.JSON(http.StatusOK, response)
	}
}

func getPastGuessesCategoriesByUserID(userID types.UserID, db *dbHandler.DBHandler) ([]types.PastGuessesCategories, error) {
	var guesses []types.PastGuessesCategories

	// get gameSession
	gameSession, err := db.GetGameSessionByUserID(userID)
	if err != nil {
		return guesses, err
	}

	for i := range gameSession.CategoryRounds {
		guessID := types.GuessID{
			GameSessionID: gameSession.GameSessionID,
			Round:         (i + 1),
		}
		results, err := db.GetGuessResultsByGuessID(guessID)
		if err != nil {
			return guesses, err
		}
		values, err := db.GetGuessCategoriesByGuessID(guessID)
		if err != nil {
			return guesses, err
		}

		guess := types.PastGuessesCategories{
			Round:       (i + 1),
			Components:  types.PastGuessMulti{Value: values.Components, Result: results.Components},
			Class:       types.PastGuessMulti{Value: values.Class, Result: results.Class},
			Effects:     types.PastGuessMulti{Value: values.Effects, Result: results.Effects},
			Level:       types.PastGuessMulti{Value: values.Level, Result: results.Level},
			School:      types.PastGuessSingle{Value: values.School, Result: results.School},
			CastingTime: types.PastGuessSingle{Value: values.CastingTime, Result: results.CastingTime},
			Range:       types.PastGuessSingle{Value: values.Range, Result: results.Range},
			Target:      types.PastGuessSingle{Value: values.Target, Result: results.Target},
			Duration:    types.PastGuessSingle{Value: values.Duration, Result: results.Duration},
		}

		guesses = append(guesses, guess)
	}

	return guesses, nil
}
