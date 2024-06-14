package routeHandling

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/shared/types"
)

func (r *RouteHandler) MakeGuessCategories(ctx *gin.Context) {
	var payload types.SpellCategories
	var response types.ResponseMakeGuess
	if err := ctx.BindJSON(&payload); err != nil {
		fmt.Printf("Error binding payload: %v\n", err)
		ctx.String(http.StatusInternalServerError, "Invalid payload")
		return
	}
	fmt.Printf("/api/makeGuess PAYLOAD: %v\n", payload)

	// Get spell to compare (hardwired for now)
	// TODO: pull in currentSpell from users.currentGameData
	spell, err := r.dbHandler.GetSpellBySpellId(0)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, response)
		return
	}

	response = checkGuessAgainstSpell(payload, spell)

	ctx.JSON(http.StatusOK, response)
}

func checkGuessAgainstSpell(guess types.SpellCategories, spell types.SpellAllInfo) types.ResponseMakeGuess {
	var result types.ResponseMakeGuess

	// test single ints
	singlesGuess := [5]*int{&guess.School, &guess.CastingTime, &guess.Range, &guess.Target, &guess.Duration}
	singlesResult := [5]*int{&result.School, &result.CastingTime, &result.Range, &result.Target, &result.Duration}
	singlesSpell := [5]*int{&spell.School, &spell.CastingTime, &spell.Range, &spell.Target, &spell.Duration}

	for i := range singlesGuess {
		if *singlesGuess[i] == *singlesSpell[i] {
			*singlesResult[i] = 2
		} else {
			*singlesResult[i] = 0
		}
	}

	if guess.Level.Level == spell.Level.Level {
		if guess.Level.IsRitual == spell.Level.IsRitual {
			result.Level = 2
		} else {
			result.Level = 1
		}
	} else {
		if guess.Level.IsRitual == spell.Level.IsRitual {
			result.Level = 1
		} else {
			result.Level = 0
		}
	}

	return result
}
