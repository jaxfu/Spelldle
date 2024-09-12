package consts

const (
	CtxKeyUserid                string = "user_id"
	BearerTokenPrefix           string = "Bearer "
	HeaderTypeAuthorization     string = "Authorization"
	RouteUrlBase                string = "/api"
	RouteUrlLogin               string = RouteUrlBase + "/login"
	RouteUrlRegister            string = RouteUrlBase + "/register"
	RouteUrlMakeGuessCategory   string = RouteUrlBase + "/makeGuess/category"
	RouteUrlMakeGuessSpell      string = RouteUrlBase + "/makeGuess/spell"
	RouteUrlValidateSession     string = RouteUrlBase + "/validateSession"
	RouteUrlGetGameSessionInfo  string = RouteUrlBase + "/getGameSessionInfo"
	RouteUrlAddSpell            string = RouteUrlBase + "/addSpell"
	RouteUrlSpawnNewGameSession string = RouteUrlBase + "/spawnNewGameSession"
	RouteUrlGetCorrectSpellInfo string = RouteUrlBase + "/getCorrectSpellInfo"
	RouteUrlGetSpellList        string = RouteUrlBase + "/getSpellList"
	SpellGuessLimit             uint   = 3
)
