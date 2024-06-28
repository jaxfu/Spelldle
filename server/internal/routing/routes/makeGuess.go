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
		var response types.ResponseMakeGuess

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
		spell, err := db.GetSpellBySpellId(0)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		response = checkGuessAgainstSpell(payload, spell)

		ctx.JSON(http.StatusOK, response)
	}
}

func checkGuessAgainstSpell(guess types.SpellCategories, spell types.SpellAllInfo) types.ResponseMakeGuess {
	var result types.ResponseMakeGuess

	// test single ints
	singlesGuess := [5]*int{&guess.School, &guess.CastingTime, &guess.Range, &guess.Target, &guess.Duration}
	singlesSpell := [5]*int{&spell.School, &spell.CastingTime, &spell.Range, &spell.Target, &spell.Duration}
	singlesResult := [5]*int{&result.School, &result.CastingTime, &result.Range, &result.Target, &result.Duration}

	for i := range singlesResult {
		if *singlesGuess[i] == *singlesSpell[i] {
			*singlesResult[i] = 2
		} else {
			*singlesResult[i] = 0
		}
	}

	// test level
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

	// test arrays
	arraysGuess := [3]*[]int{&guess.Class, &guess.Components, &guess.Effects}
	arraysSpell := [3]*[]int{&spell.Class, &spell.Components, &spell.Effects}
	arraysResult := [3]*int{&result.Class, &result.Components, &result.Effects}

	for i := range arraysResult {
		*arraysResult[i] = compareArrays(arraysGuess[i], arraysSpell[i])
	}

	return result
}

func compareArrays(guess, spell *[]int) int {
	a := *guess
	b := *spell

	if len(a) != len(b) {
		return checkCommonElements(a, b)
	}

	identical := true
	for i := range a {
		if a[i] != b[i] {
			identical = false
			break
		}
	}

	if identical {
		return 2
	}

	return checkCommonElements(a, b)
}

func checkCommonElements(a, b []int) int {
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] < b[j] {
			i++
		} else if a[i] > b[j] {
			j++
		} else {
			return 1
		}
	}

	return 0
}
