package consts

const (
	CtxKeyUserid            string = "user_id"
	BearerTokenPrefix       string = "Bearer "
	HeaderTypeAuthorization string = "Authorization"
	RouteUrlBase            string = "/api"
	RouteUrlLogin                  = RouteUrlBase + "/login"
	RouteUrlRegister               = RouteUrlBase + "/register"
	RouteUrlMakeGuess              = RouteUrlBase + "/makeGuess"
	RouteUrlValidateSession        = RouteUrlBase + "/validateSession"
	RouteUrlGetPastGuesses         = RouteUrlBase + "/getPastGuesses"
)
