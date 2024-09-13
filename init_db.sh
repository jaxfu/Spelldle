#!/usr/bin/env bash

set -e

export PGPASSWORD=password
cd config/sql
psql -U postgres -h localhost -p 5432 -d spelldle -f init.sql
cd -
pg_restore -U postgres -h localhost -p 5432 -d spelldle --data-only --schema=spells -F c spells_data_backup.dump
