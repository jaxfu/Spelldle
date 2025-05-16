package parser

import (
	"encoding/json"
	"io"
	"os"

	"spelldle.com/server/shared/types"
)

func ParseSpellsFromJson(filename string) ([]types.SpellAll, error) {
	var spells []types.SpellAll

	buf, err := os.Open(filename)
	if err != nil {
		return spells, err
	}
	defer buf.Close()

	bytes, err := io.ReadAll(buf)
	if err != nil {
		return spells, err
	}
	json.Unmarshal(bytes, &spells)

	return spells, nil
}
