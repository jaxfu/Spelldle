package utils

import (
	"spelldle.com/server/shared/types"
)

func CreateResponseRegisterLogin(
	valid bool,
	userData types.UserDataAll,
	tokens types.AllTokens,
) types.ResponseRegisterLogin {
	return types.ResponseRegisterLogin{
		Valid:       valid,
		UserDataAll: userData,
		Tokens:      tokens,
	}
}
