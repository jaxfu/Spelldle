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

	ctx.JSON(http.StatusOK, response)
}
