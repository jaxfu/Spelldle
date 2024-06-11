package routeHandling

import (
	types2 "spelldle.com/server/types"
)

func CreateResponseRegisterLogin(
	valid bool,
	userID types2.UserID,
	userDataAccount types2.UserDataAccount,
	userDataPersonal types2.UserDataPersonal,
	userDataTokens types2.UserDataTokens,
) types2.ResponseRegisterLogin {
	return types2.ResponseRegisterLogin{
		Valid:  valid,
		UserId: userID,
		UserDataAccount: types2.ResponseUserDataAccount{
			Username: userDataAccount.Username,
		},
		UserDataPersonal: userDataPersonal,
		UserDataTokens:   userDataTokens,
	}
}
