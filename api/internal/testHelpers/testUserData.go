// Package testHelpers includes objects that can be shared across
// different unit tests
package testHelpers

import "spelldle.com/server/internal/schemas"

var TestUserDataAll = schemas.UserDataAll{
	UserID: 1,
	UserDataPersonal: schemas.UserDataPersonal{
		FirstName: "Jackson",
		LastName:  "Furr",
	},
	UserDataAccount: schemas.UserDataAccount{
		Username: "poemmys",
		Password: "pass",
	},
	UserDataTokens: schemas.UserDataTokens{
		AccessToken:  "test_token",
		RefreshToken: "test_token",
	},
}

var TestUserRegisterPayload = schemas.RequestPayloadRegister{
	Username:  "poemmys",
	Password:  "pass",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserLoginPayload = schemas.RequestPayloadLogin{
	Username: "poemmys",
	Password: "pass",
}
