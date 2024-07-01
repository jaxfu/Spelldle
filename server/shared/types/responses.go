package types

type ResponseRegisterLogin struct {
	Tokens AllTokens `json:"tokens"`
	UserDataAll
	Valid bool `json:"valid"`
}

type ResponseUserDataAccount struct {
	Username string `json:"username"`
}

type ResponseValidateSession struct {
	UserDataAll
	Valid bool `json:"valid"`
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
