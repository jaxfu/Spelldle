package types

type RequestPayloadLogin struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RequestPayloadRegister struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type RequestPayloadMakeGuess struct {
	GuessInfo SpellCategories `json:"guess_info"`
}
