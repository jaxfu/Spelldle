#!/usr/bin/env bash

set -e

psql -U fraterhqc -d spelldle -f drop_tables.sql &&
psql -U fraterhqc -d spelldle -f create_tables.sql &&
pg_restore -U fraterhqc -d spelldle --data-only --schema=spells -F c spells_data_backup.dump
