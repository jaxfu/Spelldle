// Package testHelpers includes objects that can be shared across
// different unit tests
package testHelpers

import "spelldle.com/server/internal/schemas"

var TestRegisterPayload = schemas.RegisterPayload{
	Username:  "Poemmys",
	Password:  "password",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserAccountData = schemas.UserAccountData{
	UserID:    1,
	Username:  "Poemmys",
	Password:  "password",
	FirstName: "Jackson",
	LastName:  "Furr",
}

var TestUserSessionData = schemas.UserSessionData{
	UserID:     1,
	SessionKey: "TEST_UUID",
	Expires:    1706245738,
}

var TestUserSessionDataIncorrect = schemas.UserSessionData{
	UserID:     1,
	SessionKey: "Incorrect",
	Expires:    1706245738,
}

var TestUserLoginPayload = schemas.LoginPayload{
	Username: "Poemmys",
	Password: "password",
}
