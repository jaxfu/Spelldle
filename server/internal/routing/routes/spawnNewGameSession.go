package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
)

type response struct {
	SpellID uint `json:"spell_id"`
}

func SpawnNewGameSession(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var response response

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusUnauthorized, response)
			return
		}

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		response.SpellID = gameSession.SpellID

		// generate new gameSession
		newGameSession, err := utils.SpawnNewGameSession(userID, gameSession.SpellID, db)
		if err != nil {
			fmt.Printf("error spawning new gameSession: %+v", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// insert new gameSession
		if err := db.InsertGameSession(newGameSession); err != nil {
			fmt.Printf("error in InsertGameSession: %+v", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// update user gameSessionID
		if err := db.UpdateUserGameSessionIDByUserID(newGameSession.GameSessionID, userID); err != nil {
			fmt.Printf("error in UpdateGameSessionIDByUserID: %+v", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		ctx.JSON(http.StatusOK, response)
	}
}
