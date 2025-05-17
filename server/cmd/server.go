package main

import (
	"fmt"
	"log"
	"os"

	"spelldle.com/server/internal/routing/routes"

	"spelldle.com/server/shared/dbHandler"

	"github.com/gin-contrib/cors"
	"github.com/mandrigin/gin-spa/spa"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/internal/routing/middleware"
)

func main() {
	// ENV CONFIG
	if os.Getenv("MODE") != "PROD" {
		if err := godotenv.Load("../config/config.env"); err != nil {
			log.Fatalf("%+v\n", err)
		}
	}
	PORT := os.Getenv("PORT")
	if PORT == "" {
		log.Fatal("No env variable PORT")
	}

	// Conn
	db, err := dbHandler.InitDBHandler(os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalf("error opening db connection: %+v", err)
	}
	defer db.Conn.Close()

	// ROUTING
	router := gin.Default()
	if os.Getenv("MODE") == "DEV" {
		fmt.Println("**DEV MODE DETECTED, ENABLING CORS**")
		config := cors.DefaultConfig()
		config.AllowAllOrigins = true
		config.AllowMethods = []string{"POST", "GET"}
		config.AllowHeaders = []string{consts.HeaderTypeAuthorization, "Content-Type"}
		router.Use(cors.New(config))
	}

	// init middleware handler
	middleware := middleware.NewMiddlewareHandler()
	router.Use(middleware.ValidateAccessToken())

	router.SetTrustedProxies([]string{"127.0.0.1"})
	router.POST(consts.RouteUrlRegister, routes.Register(db))
	router.POST(consts.RouteUrlLogin, routes.Login(db))
	router.POST(consts.RouteUrlValidateSession, routes.ValidateSession(db))
	router.POST(consts.RouteUrlMakeGuessCategory, routes.MakeGuessCategory(db))
	router.POST(consts.RouteUrlMakeGuessSpell, routes.MakeGuessSpell(db))
	router.POST(consts.RouteUrlGetGameSessionInfo, routes.GetGameSessionInfo(db))
	router.POST(consts.RouteUrlAddSpell, routes.AddSpell(db))
	router.POST(consts.RouteUrlSpawnNewGameSession, routes.SpawnNewGameSession(db))
	router.POST(consts.RouteUrlGetCorrectSpellInfo, routes.GetCorrectSpellInfo(db))
	router.POST(consts.RouteUrlGetSpellList, routes.GetSpellList(db))

	router.Use(spa.Middleware("/", "client"))

	log.Panic(router.Run(PORT))
}
