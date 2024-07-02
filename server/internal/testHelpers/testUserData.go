// Package testHelpers includes objects that can be shared across
// different unit tests
package testHelpers

import (
	"spelldle.com/server/shared/types"
)

var TestUserData = types.UserData{
	UserID:    1,
	FirstName: "Jackson",
	LastName:  "Furr",
	Username:  "poemmys",
	Password:  "pass",
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
