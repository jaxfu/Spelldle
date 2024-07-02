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

type ResponseMakeGuess struct {
	Components  int `json:"components"`
	Class       int `json:"class"`
	Effects     int `json:"effects"`
	Level       int `json:"level"`
	School      int `json:"school"`
	CastingTime int `json:"casting_time"`
	Range       int `json:"range"`
	Target      int `json:"target"`
	Duration    int `json:"duration"`
}

type ResponseValidateToken struct {
	Valid bool `json:"valid"`
}
