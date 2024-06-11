package parser

import (
	"encoding/json"
	"io"
	"os"

	"spelldle.com/server/types"
)

func ParseSpells(filename string) ([]types.SpellAllInfo, error) {
	var spells []types.SpellAllInfo

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
