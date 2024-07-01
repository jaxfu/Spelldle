package types

type UserID uint

type UserDataAll struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	UserID    UserID `json:"user_id"`
}
