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
			fmt.Printf("%+v\n", err)
			os.Exit(1)
		}
	}
	PORT := os.Getenv("PORT")
	if PORT == "" {
		fmt.Println("No env variable PORT")
		os.Exit(1)
	}

	// Test backup
	// cmd := exec.Command("./backup.sh")
	// if err := cmd.Run(); err != nil {
	// 	log.Printf("Error backing up Postgres: %+v\n", err)
	// }

	// Conn
	db := dbHandler.InitDBHandler(os.Getenv("DB_URL"))
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

	router.Use(middleware.ValidateAccessToken())

	router.POST(consts.RouteUrlRegister, routes.Register(db))
	router.POST(consts.RouteUrlLogin, routes.Login(db))
	router.POST(consts.RouteUrlValidateSession, routes.ValidateSession(db))
	router.POST(consts.RouteUrlMakeGuessCategory, routes.MakeGuessCategory(db))
	router.POST(consts.RouteUrlMakeGuessSpell, routes.MakeGuessSpell(db))
	router.POST(consts.RouteUrlGetGameSessionInfo, routes.GetGameSessionInfo(db))
	router.POST(consts.RouteUrlAddSpell, routes.AddSpell(db))

	router.Use(spa.Middleware("/", "client"))

	log.Panic(router.Run(PORT))
}
