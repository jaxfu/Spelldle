package types

type ResponseUserData struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	UserID    UserID `json:"user_id"`
}

type ResponseRegisterLogin struct {
	Tokens   AllTokens        `json:"tokens"`
	UserData ResponseUserData `json:"user_data"`
	Valid    bool             `json:"valid"`
}

type ResponseValidateSession struct {
	UserData ResponseUserData `json:"user_data"`
	Valid    bool             `json:"valid"`
}

type ResponseValidateToken struct {
	Valid bool `json:"valid"`
}

type ResponseGetGuesses struct {
	GameSessionID
	Guesses []GuessAll `json:"guesses"`
}
