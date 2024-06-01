// Package testHelpers includes objects that can be shared across
// different unit tests
package testHelpers

import "spelldle.com/server/internal/schemas"

var TestRegisterPayload = schemas.RequestPayloadRegister{
	Username:  "Poemmys",
	Password:  "password",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserAccountData = schemas.UserDataAccount{
	UserID:    1,
	Username:  "Poemmys",
	Password:  "password",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserSessionData = schemas.UserDataSession{
	UserID:     1,
	SessionKey: "TEST_UUID",
	Expires:    1706245738,
}

var TestUserSessionDataIncorrect = schemas.UserDataSession{
	UserID:     1,
	SessionKey: "Incorrect",
	Expires:    1706245738,
}

var TestUserLoginPayload = schemas.RequestPayloadLogin{
	Username: "Poemmys",
	Password: "password",
}
