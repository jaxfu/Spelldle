package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
)

type payload struct {
	SpellID uint `json:"spell_id"`
}

type response struct {
	Correct bool `json:"correct"`
}

func MakeGuessSpell(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		response := response{Correct: false}

		// get userID from jwt
		userID, err := utils.GetJwtInfoFromCtx(ctx)
		if err != nil {
			fmt.Printf("error in GetJwtInfoFromCtx %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// bind payload
		var payload payload
		err = ctx.BindJSON(&payload)
		if err != nil {
			fmt.Printf("Error binding payload: %v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		fmt.Printf("spellGuess payload: %+v\n", payload)

		// get gameSession
		gameSession, err := db.GetGameSessionByUserID(userID)
		if err != nil {
			fmt.Printf("Error getting gameSession: %v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// insert spell guess
		if err := db.InsertGuessSpell(gameSession.GameSessionID, payload.SpellID); err != nil {
			fmt.Printf("error in InsertGuessSpell: %+v", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// update gameSession spell_rounds
		if err := db.UpdateGameSessionSpellRounds(userID, gameSession.SpellRounds+1); err != nil {
			fmt.Printf("error in UpdateGameSessionSpellRounds: %+v", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		// if spell correct or spell guess limit reached, set response and spawn new game session
		if payload.SpellID == gameSession.SpellID || gameSession.SpellRounds+1 == consts.SpellGuessLimit {
			if payload.SpellID == gameSession.SpellID {
				response.Correct = true
			}

			newGameSession, err := utils.SpawnNewGameSession(userID, gameSession.SpellID, db)
			if err != nil {
				fmt.Printf("error spawning new gameSession: %+v", err)
				ctx.JSON(http.StatusInternalServerError, response)
				return
			}

			// insert new gameSessionData
			if err := db.InsertGameSession(newGameSession); err != nil {
				fmt.Printf("error in InsertGameSession: %+v", err)
				ctx.JSON(http.StatusInternalServerError, response)
				return
			}

			// update user gameSessionID
			if err := db.UpdateGameSessionIDByUserID(newGameSession.GameSessionID, userID); err != nil {
				fmt.Printf("error in UpdateGameSessionIDByUserID: %+v", err)
				ctx.JSON(http.StatusInternalServerError, response)
				return
			}
		}

		ctx.JSON(http.StatusOK, response)
	}
}
