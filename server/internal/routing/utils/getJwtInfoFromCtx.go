package utils

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/shared/types"
)

func GetJwtInfoFromCtx(ctx *gin.Context) (types.UserID, error) {
	var userID types.UserID = 0
	v, e := ctx.Get(consts.CtxKeyUserid)
	if !e {
		return userID, fmt.Errorf("%s does not exist on context object", consts.CtxKeyUserid)
	}
	uintValue, ok := v.(uint)
	if !ok {
		return userID, fmt.Errorf("value was not a uint")
	}
	return types.UserID(uintValue), nil
}
