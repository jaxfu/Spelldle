package routeHandling

import "spelldle.com/server/internal/schemas"

func CreateResponseRegisterLogin(
	valid bool,
	userID schemas.UserID,
	userDataAccount schemas.UserDataAccount,
	userDataPersonal schemas.UserDataPersonal,
	userDataTokens schemas.UserDataTokens,
) schemas.ResponseRegisterLogin {
	return schemas.ResponseRegisterLogin{
		Valid:  valid,
		UserId: userID,
		UserDataAccount: schemas.ResponseUserDataAccount{
			Username: userDataAccount.Username,
		},
		UserDataPersonal: userDataPersonal,
		UserDataTokens:   userDataTokens,
	}
}
