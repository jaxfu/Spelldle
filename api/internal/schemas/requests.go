package schemas

type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterPayload struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type ValidationPayload struct {
	UserID     uint   `json:"user_id"`
	SessionKey string `json:"session_key"`
}
