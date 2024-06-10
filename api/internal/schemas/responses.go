package schemas

type ResponseRegisterLogin struct {
	UserDataPersonal UserDataPersonal        `json:"user_data_personal"`
	UserDataTokens   UserDataTokens          `json:"user_data_tokens"`
	UserDataAccount  ResponseUserDataAccount `json:"user_data_account"`
	UserId           UserID                  `json:"user_id"`
	Valid            bool                    `json:"valid"`
}

type ResponseUserDataAccount struct {
	Username string `json:"username"`
}

type ResponseValidateSession struct {
	UserDataPersonal UserDataPersonal        `json:"user_data_personal"`
	UserDataAccount  ResponseUserDataAccount `json:"user_data_account"`
	UserId           UserID                  `json:"user_id"`
	Valid            bool                    `json:"valid"`
}
