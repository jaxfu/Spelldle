package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

func GetGameSessionInfo(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var response types.ResponseGetGameSessionInfo

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("error in GetGameSessionByUserID %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// get guess categories and results
		guessesCategories, err := getPastGuessesCategories(gameSession, db)
		if err != nil {
			fmt.Printf("error in getPastGuessesCategoriesByUserID %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// get guess spells
		guessesSpells, err := db.GetGuessSpellsByGameSessionID(gameSession.GameSessionID)
		if err != nil {
			fmt.Printf("error in GetSpellsByUserID %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		if len(guessesCategories) == 0 {
			response.Guesses.Categories = []types.PastGuessCategory{}
		} else {
			response.Guesses.Categories = guessesCategories
		}

		if len(guessesSpells) == 0 {
			response.Guesses.Spells = types.PastGuessesSpells{}
		} else {
			response.Guesses.Spells = guessesSpells
		}

		// get spell names
		names, err := db.GetSpellNames()
		if err != nil {
			fmt.Printf("error in GetSpellNames %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		response.Spells = names

		ctx.JSON(http.StatusOK, response)
	}
}

func getPastGuessesCategories(gameSession types.GameSession, db *dbHandler.DBHandler) ([]types.PastGuessCategory, error) {
	var guesses []types.PastGuessCategory

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

		guess := types.PastGuessCategory{
			Round:       (i + 1),
			Components:  types.PastGuessCategoryMulti{Value: values.Components, Result: results.Components},
			Class:       types.PastGuessCategoryMulti{Value: values.Class, Result: results.Class},
			Effects:     types.PastGuessCategoryMulti{Value: values.Effects, Result: results.Effects},
			Level:       types.PastGuessCategorySingleWithToggle{Value: values.Level, Result: results.Level},
			Duration:    types.PastGuessCategorySingleWithToggle{Value: values.Duration, Result: results.Duration},
			School:      types.PastGuessCategorySingle{Value: values.School, Result: results.School},
			CastingTime: types.PastGuessCategorySingle{Value: values.CastingTime, Result: results.CastingTime},
			Range:       types.PastGuessCategorySingle{Value: values.Range, Result: results.Range},
			Target:      types.PastGuessCategorySingle{Value: values.Target, Result: results.Target},
		}

		guesses = append(guesses, guess)
	}

	return guesses, nil
}
