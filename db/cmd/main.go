package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"spelldle.com/db/internal/parser"
	"spelldle.com/server/shared/dbHandler"
)

func main() {
	if os.Getenv("MODE") != "PROD" {
		if err := godotenv.Load("../config/config.env"); err != nil {
			fmt.Printf("%+v\n", err)
			os.Exit(1)
		}
	}

	db := dbHandler.InitDBHandler(os.Getenv("DB_URL"))
	defer db.DB.Close()

	spells, err := parser.ParseSpellsFromJson("../config/spells.json")
	if err != nil {
		fmt.Printf("%+v\n", err)
		os.Exit(1)
	}

	for spell := range spells {
		err = db.InsertSpell(spells[spell])
		if err != nil {
			fmt.Printf("error inserting spell: %+v\n", err)
			os.Exit(1)
		}
	}

	fmt.Println("Succesfully inserted spells")
}
