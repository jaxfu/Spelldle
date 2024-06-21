package consts

const (
	CTX_KEY_USERID             string = "user_id"
	BEARER_TOKEN_PREFIX        string = "Bearer "
	HEADER_TYPE_AUTHORIZATION  string = "Authorization"
	ROUTE_URL_BASE             string = "/api"
	ROUTE_URL_LOGIN            string = ROUTE_URL_BASE + "/login"
	ROUTE_URL_REGISTER         string = ROUTE_URL_BASE + "/register"
	ROUTE_URL_MAKE_GUESS       string = ROUTE_URL_BASE + "/makeGuess"
	ROUTE_URL_VALIDATE_SESSION string = ROUTE_URL_BASE + "/validateSession"
)
