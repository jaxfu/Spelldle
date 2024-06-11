// Package testHelpers includes objects that can be shared across
// different unit tests
package testHelpers

import (
	types2 "spelldle.com/server/types"
)

var TestUserDataAll = types2.UserDataAll{
	UserID: 1,
	UserDataPersonal: types2.UserDataPersonal{
		FirstName: "Jackson",
		LastName:  "Furr",
	},
	UserDataAccount: types2.UserDataAccount{
		Username: "poemmys",
		Password: "pass",
	},
	UserDataTokens: types2.UserDataTokens{
		AccessToken:  "test_token",
		RefreshToken: "test_token",
	},
}

var TestUserRegisterPayload = types2.RequestPayloadRegister{
	Username:  "poemmys",
	Password:  "pass",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserLoginPayload = types2.RequestPayloadLogin{
	Username: "poemmys",
	Password: "pass",
}

var TestUserLoginPayloadInvalidPassword = types2.RequestPayloadLogin{
	Username: "poemmys",
	Password: "invalid",
}

var TestUserLoginPayloadInvalidUsername = types2.RequestPayloadLogin{
	Username: "invalid",
	Password: "pass",
}
