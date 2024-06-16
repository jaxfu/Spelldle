package main

import (
	"fmt"
	"log"
	"os"

	"spelldle.com/server/shared/dbHandler"

	"github.com/gin-contrib/cors"
	"github.com/mandrigin/gin-spa/spa"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"spelldle.com/server/internal/routeHandling"
	"spelldle.com/server/internal/routeHandling/middleware"
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

	// DB
	db := dbHandler.InitDBHandler(os.Getenv("DB_URL"))
	defer db.DB.Close()

	// ROUTING
	routeHandler := routeHandling.InitRouteHandler(db)
	router := gin.Default()
	if os.Getenv("MODE") == "DEV" {
		fmt.Println("**DEV MODE DETECTED, ENABLING CORS**")
		config := cors.DefaultConfig()
		config.AllowAllOrigins = true
		config.AllowMethods = []string{"POST", "GET"}
		router.Use(cors.New(config))
	}

	router.Use(middleware.ValidateAccessToken(db))

	router.POST("/api/register", routeHandler.Register)
	router.POST("/api/validateSession", routeHandler.ValidateSession)
	router.POST("/api/login", routeHandler.Login)
	router.POST("/api/makeGuess", routeHandler.MakeGuessCategories)

	router.Use(spa.Middleware("/", "client"))

	log.Panic(router.Run(PORT))
}
