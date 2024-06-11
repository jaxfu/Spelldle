package types

type UserID uint

type UserDataPersonal struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type UserDataAccount struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserDataTokens struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type UserDataAll struct {
	UserDataPersonal UserDataPersonal `json:"userDataPersonal"`
	UserDataAccount  UserDataAccount  `json:"userDataAccount"`
	UserDataTokens   UserDataTokens   `json:"userDataTokens"`
	UserID           UserID           `json:"user_id"`
}
