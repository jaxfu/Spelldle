package utils

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routeHandling/consts"
	"spelldle.com/server/shared/types"
)

func GetJwtInfoFromCtx(ctx *gin.Context) (types.UserID, error) {
	var userID types.UserID = 0
	v, e := ctx.Get(consts.CTX_KEY_USERID)
	if !e {
		return userID, fmt.Errorf("%s does not exist on context object", consts.CTX_KEY_USERID)
	}
	uintValue, ok := v.(uint)
	if !ok {
		return userID, fmt.Errorf("value was not a uint")
	}
	return types.UserID(uintValue), nil
}
