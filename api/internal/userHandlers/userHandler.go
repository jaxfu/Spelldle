package userHandlers

import (
	"time"

	"github.com/google/uuid"
	"spelldle.com/server/internal/schemas"
)

func GenerateNewUserSessionData(id uint) schemas.UserSessionData {
	userSessionData := schemas.UserSessionData{
		UserID:     id,
		SessionKey: uuid.New().String(),
		Expires:    uint64(time.Now().Unix() + 7776000),
	}
	return userSessionData
}
