package routeHandling

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"spelldle.com/server/types"
)

func (r *RouteHandler) MakeGuessCategories(ctx *gin.Context) {
	var payload types.SpellCategories
	if err := ctx.BindJSON(&payload); err != nil {
		fmt.Printf("Error binding payload: %v\n", err)
		ctx.String(http.StatusInternalServerError, "Invalid payload")
		return
	}
	fmt.Printf("PAYLOAD: %v\n", payload)
	ctx.String(http.StatusOK, "Success")
}
