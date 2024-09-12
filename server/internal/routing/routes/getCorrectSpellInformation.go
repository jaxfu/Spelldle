package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

type getCorrectSpellInfoResponse struct {
	Name       string                `json:"name"`
	Categories types.SpellCategories `json:"categories"`
	SpellID    uint                  `json:"spell_id"`
}

func GetCorrectSpellInfo(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var res getCorrectSpellInfoResponse

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusUnauthorized, res)
			return
		}

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.JSON(http.StatusInternalServerError, res)
			return
		}
		res.SpellID = gameSession.SpellID

		// get spell from gameSession
		spell, err := db.GetSpellBySpellId(gameSession.SpellID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.JSON(http.StatusInternalServerError, res)
			return
		}

		res.Name = spell.Name
		res.SpellID = spell.SpellID
		res.Categories = spell.SpellCategories

		ctx.JSON(http.StatusOK, res)
	}
}
