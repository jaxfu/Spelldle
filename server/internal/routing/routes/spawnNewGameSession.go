package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
)

func SpawnNewGameSession(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// generate new gameSession
		newGameSession, err := utils.SpawnNewGameSession(userID, gameSession.SpellID, db)
		if err != nil {
			fmt.Printf("error spawning new gameSession: %+v", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// insert new gameSession
		if err := db.InsertGameSession(newGameSession); err != nil {
			fmt.Printf("error in InsertGameSession: %+v", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		// update user gameSessionID
		if err := db.UpdateGameSessionIDByUserID(newGameSession.GameSessionID, userID); err != nil {
			fmt.Printf("error in UpdateGameSessionIDByUserID: %+v", err)
			ctx.Status(http.StatusInternalServerError)
			return
		}

		ctx.Status(http.StatusOK)
	}
}
