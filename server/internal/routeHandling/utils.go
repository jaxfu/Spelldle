package routeHandling

import (
	"spelldle.com/server/shared/types"
)

func CreateResponseRegisterLogin(
	valid bool,
	userID types.UserID,
	userDataAccount types.UserDataAccount,
	userDataPersonal types.UserDataPersonal,
	userDataTokens types.AllTokens,
) types.ResponseRegisterLogin {
	return types.ResponseRegisterLogin{
		Valid:  valid,
		UserId: userID,
		UserDataAccount: types.ResponseUserDataAccount{
			Username: userDataAccount.Username,
		},
		UserDataPersonal: userDataPersonal,
		UserDataTokens:   userDataTokens,
	}
}
