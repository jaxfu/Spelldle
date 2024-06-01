package schemas

type ResponseRegisterLogin struct {
	Valid            bool                    `json:"valid"`
	UserId           UserID                  `json:"user_id"`
	UserDataAccount  ResponseUserDataAccount `json:"user_data_account"`
	UserDataPersonal UserDataPersonal        `json:"user_data_personal"`
	UserDataTokens   UserDataTokens          `json:"user_data_tokens"`
}

type ResponseUserDataAccount struct {
	Username string `json:"username"`
}

type ResponseValidateSession struct {
	Valid            bool                    `json:"valid"`
	UserId           UserID                  `json:"user_id"`
	UserDataAccount  ResponseUserDataAccount `json:"user_data_account"`
	UserDataPersonal UserDataPersonal        `json:"user_data_personal"`
}
