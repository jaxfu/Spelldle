package main

import (
	"fmt"

	"spelldle.com/db/internal/parser"
)

func main() {
	spells, err := parser.ParseSpells("spells.json")
	if err != nil {
		fmt.Printf("%+v\n", err)
	}
	fmt.Printf("%+v\n", spells)
}
