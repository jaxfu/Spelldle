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

const QGetSpellsCount = `
	SELECT COUNT(*)
	FROM spells.ids
`

func (dbHandler *DBHandler) GetSpellsCount() (uint, error) {
	var count uint
	err := dbHandler.Conn.QueryRow(context.Background(), QGetSpellsCount).Scan(&count)
	if err != nil {
		return count, err
	}

	return count, nil
}

const QGetSpellNames = `
	SELECT name
	FROM spells.categories
	ORDER BY spell_id
`

func (dbHandler *DBHandler) GetSpellNames() ([]string, error) {
	var names []string

	rows, err := dbHandler.Conn.Query(context.Background(), QGetSpellNames)
	if err != nil {
		return names, err
	}
	defer rows.Close()

	for rows.Next() {
		var name string

		if err := rows.Scan(&name); err != nil {
			return names, err
		}

		names = append(names, name)
	}

	if err := rows.Err(); err != nil {
		return names, err
	}

	return names, nil
}

// Inserts

const EInsertSpellID = `
  INSERT INTO spells.ids DEFAULT VALUES
	RETURNING spell_id
`

const EInsertSpellCategories = `
  INSERT INTO spells.categories(spell_id, name, school, casting_time, range, target, duration, level, components, class, effects)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
`

func (dbHandler *DBHandler) InsertSpell(spellInfo types.SpellAll) error {
	var spellID uint
	err := dbHandler.Conn.QueryRow(context.Background(), EInsertSpellID).Scan(&spellID)
	if err != nil {
		return err
	}

	_, err = dbHandler.Conn.Exec(context.Background(), EInsertSpellCategories,
		spellID,
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
