package middleware

import "spelldle.com/server/internal/routing/consts"

type MiddlewareHandler struct {
	JWTValidatedRoutes map[string]struct{}
}

func NewMiddlewareHandler() *MiddlewareHandler {
	MiddlewareHandler := MiddlewareHandler{
		JWTValidatedRoutes: map[string]struct{}{
			consts.RouteUrlMakeGuessCategory:   {},
			consts.RouteUrlMakeGuessSpell:      {},
			consts.RouteUrlValidateSession:     {},
			consts.RouteUrlGetGameSessionInfo:  {},
			consts.RouteUrlGetCorrectSpellInfo: {},
			consts.RouteUrlAddSpell:            {},
			consts.RouteUrlSpawnNewGameSession: {},
		},
	}

	return &MiddlewareHandler
}
