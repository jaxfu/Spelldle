package dbHandler

import (
	"context"

	"spelldle.com/server/shared/types"
)

// GETS

const QGetSpellAllBySpellId = `
  SELECT name, school, casting_time, range, target, duration, level, is_ritual, components, class, effects
  FROM spells.categories
  NATURAL JOIN spells.level_objects
  WHERE spell_id=$1
`

const QGetSpellBySpellId = `
  SELECT name, school, casting_time, range, target, duration, level, is_ritual, components, class, effects
  FROM spells.categories
  WHERE spell_id=$1
`

const QGetSpellLevelBySpellId = `
  SELECT level, is_ritual
  FROM spells.level_objects
  WHERE spell_id=$1
`

func (dbHandler *DBHandler) GetSpellBySpellId(spellID uint) (types.SpellAllInfo, error) {
	spell := types.SpellAllInfo{
		SpellID: spellID,
	}

	err := dbHandler.Conn.QueryRow(context.Background(), QGetSpellAllBySpellId, spellID).Scan(
		&spell.Name,
		&spell.School,
		&spell.CastingTime,
		&spell.Range,
		&spell.Target,
		&spell.Duration,
		&spell.Level.Level,
		&spell.Level.IsRitual,
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
  INSERT INTO spells.categories(spell_id, name, school, casting_time, range, target, duration, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`

const EInsertSpellLevel = `
  INSERT INTO spells.level_objects(spell_id, level, is_ritual)
  VALUES ($1, $2, $3)
`

func (dbHandler *DBHandler) InsertSpell(spellInfo types.SpellAllInfo) error {
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
		spellInfo.Components,
		spellInfo.Class,
		spellInfo.Effects,
	)
	if err != nil {
		return err
	}
	_, err = dbHandler.Conn.Exec(context.Background(), EInsertSpellLevel,
		spellInfo.SpellID,
		spellInfo.Level.Level,
		spellInfo.Level.IsRitual,
	)
	if err != nil {
		return err
	}

	return nil
}
