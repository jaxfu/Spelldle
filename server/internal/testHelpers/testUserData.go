// Package testHelpers includes objects that can be shared across
// different unit tests
package testHelpers

import (
	"spelldle.com/server/shared/types"
)

var TestUserDataAll = types.UserDataAll{
	UserID: 1,
	UserDataPersonal: types.UserDataPersonal{
		FirstName: "Jackson",
		LastName:  "Furr",
	},
	UserDataAccount: types.UserDataAccount{
		Username: "poemmys",
		Password: "pass",
	},
}

var TestUserRegisterPayload = types.RequestPayloadRegister{
	Username:  "poemmys",
	Password:  "pass",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserLoginPayload = types.RequestPayloadLogin{
	Username: "poemmys",
	Password: "pass",
}

var TestUserLoginPayloadInvalidPassword = types.RequestPayloadLogin{
	Username: "poemmys",
	Password: "invalid",
}

var TestUserLoginPayloadInvalidUsername = types.RequestPayloadLogin{
	Username: "invalid",
	Password: "pass",
}
