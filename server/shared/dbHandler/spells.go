package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetSpellBySpellId = `
  SELECT name, school, casting_time, range, target, duration, level, components, class, effects
	FROM spells.categories
  WHERE spell_id=$1
`

func (dbHandler *DBHandler) GetSpellBySpellId(spellID uint) (types.SpellAll, error) {
	spell := types.SpellAll{
		SpellID: spellID,
	}

	err := dbHandler.Conn.QueryRow(context.Background(), QGetSpellBySpellId, spellID).Scan(
		&spell.Name,
		&spell.School,
		&spell.CastingTime,
		&spell.Range,
		&spell.Target,
		&spell.Duration,
		&spell.Level,
		&spell.Components,
		&spell.Class,
		&spell.Effects,
	)
	if err != nil {
		return spell, err
	}

	return spell, nil
}

// Inserts

const EInsertSpellID = `
  INSERT INTO spells.ids(spell_id)
  VALUES ($1)
`

const EInsertSpellCategories = `
  INSERT INTO spells.categories(spell_id, name, school, casting_time, range, target, duration, level, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
`

func (dbHandler *DBHandler) InsertSpell(spellInfo types.SpellAll) error {
	_, err := dbHandler.Conn.Exec(context.Background(), EInsertSpellID,
		spellInfo.SpellID,
	)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertSpellCategories,
		spellInfo.SpellID,
		spellInfo.Name,
		spellInfo.School,
		spellInfo.CastingTime,
		spellInfo.Range,
		spellInfo.Target,
		spellInfo.Duration,
		spellInfo.Level,
		spellInfo.Components,
		spellInfo.Class,
		spellInfo.Effects,
	)
	if err != nil {
		return err
	}

	return nil
}
