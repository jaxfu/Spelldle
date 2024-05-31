package schemas

type BasicUserDataResponse struct {
	UserID    uint   `json:"user_id"`
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type LoginResponse struct {
	Valid      bool                  `json:"valid"`
	UserData   BasicUserDataResponse `json:"user_data,omitempty"`
	SessionKey string                `json:"session_key"`
}

type RegisterResponse struct {
	Valid          bool                  `json:"valid"`
	UserData       BasicUserDataResponse `json:"user_data,omitempty"`
	UserTokensData UserTokensData        `json:"user_tokens_data,omitempty"`
}

type ValidationResponse struct {
	Valid    bool                  `json:"valid"`
	UserData BasicUserDataResponse `json:"user_data,omitempty"`
}
