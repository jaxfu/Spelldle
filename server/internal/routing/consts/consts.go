package consts

const (
	CtxKeyUserid                string = "user_id"
	BearerTokenPrefix           string = "Bearer "
	HeaderTypeAuthorization     string = "Authorization"
	RouteUrlBase                string = "/api"
	RouteUrlLogin                      = RouteUrlBase + "/login"
	RouteUrlRegister                   = RouteUrlBase + "/register"
	RouteUrlMakeGuessCategory          = RouteUrlBase + "/makeGuess/category"
	RouteUrlMakeGuessSpell             = RouteUrlBase + "/makeGuess/spell"
	RouteUrlValidateSession            = RouteUrlBase + "/validateSession"
	RouteUrlGetGameSessionInfo         = RouteUrlBase + "/getGameSessionInfo"
	RouteUrlAddSpell                   = RouteUrlBase + "/addSpell"
	RouteUrlSpawnNewGameSession        = RouteUrlBase + "/spawnNewGameSession"
	RouteUrlGetCorrectSpellInfo        = RouteUrlBase + "/getCorrectSpellInfo"
	SpellGuessLimit             uint   = 3
)
