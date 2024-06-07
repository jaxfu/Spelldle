package schemas

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

type RequestPayloadValidateSession struct {
	AccessToken string `json:"access_token"`
}

type RequestPayloadMakeGuessCategories struct {
	School      int                `json:"school"`
	Level       SpellCategoryLevel `json:"level"`
	CastingTime int                `json:"casting_time"`
	Range       int                `json:"range"`
	Target      int                `json:"target"`
	Duration    int                `json:"duration"`
	Components  []int              `json:"components"`
	Class       []int              `json:"class"`
	Effects     []int              `json:"effects"`
}
