package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
)

type payload struct {
	SpellID uint `json:"spell_id"`
}

func MakeGuessSpell(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// bind payload
		var payload payload
		err = ctx.BindJSON(&payload)
		if err != nil {
			fmt.Printf("Error binding payload: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}
		fmt.Printf("spellGuess payload: %+v\n", payload)

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// insert spell guess
		if err := db.InsertGuessSpell(gameSession.GameSessionID, payload.SpellID); err != nil {
			fmt.Printf("error in InsertGuessSpell: %+v", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// update gameSession spell_rounds
		if err := db.UpdateGameSessionSpellRounds(userID, gameSession.SpellRounds+1); err != nil {
			fmt.Printf("error in UpdateGameSessionSpellRounds: %+v", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		ctx.Status(http.StatusOK)
	}
}
