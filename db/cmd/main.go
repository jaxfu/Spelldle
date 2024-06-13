package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"spelldle.com/db/internal/parser"
)

func main() {
	if os.Getenv("MODE") != "PROD" {
		if err := godotenv.Load("../config/config.env"); err != nil {
			fmt.Printf("%+v\n", err)
			os.Exit(1)
		}
	}

	spells, err := parser.ParseSpells("spells.json")
	if err != nil {
		fmt.Printf("%+v\n", err)
	}
	fmt.Printf("%+v\n", spells)
}
