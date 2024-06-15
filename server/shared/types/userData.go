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

type UserDataAll struct {
	UserDataPersonal UserDataPersonal `json:"userDataPersonal"`
	UserDataAccount  UserDataAccount  `json:"userDataAccount"`
	UserID           UserID           `json:"user_id"`
}
