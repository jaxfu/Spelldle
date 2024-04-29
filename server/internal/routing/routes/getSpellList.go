package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
)

func GetSpellList(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		res := []string{}
		// check if valid JWT
		_, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusUnauthorized, res)
			return
		}

		spells, err := db.GetSpellNames()
		if err != nil {
			fmt.Printf("error in GetSpellNames %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, res)
			return
		}

		ctx.JSON(http.StatusOK, spells)
	}
}
