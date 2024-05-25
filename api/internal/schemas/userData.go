package schemas

type UserAccountData struct {
	UserID    uint   `json:"user_id"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type UserSessionData struct {
	UserID     uint   `json:"user_id"`
	SessionKey string `json:"session_key"`
	Expires    uint64 `json:"expires"`
}
