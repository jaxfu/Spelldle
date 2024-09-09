#!/usr/bin/env bash

set -e

export PGPASSWORD=password &&
psql -U postgres -h localhost -p 5432 -d spelldle -f init.sql &&
./restore_spells.sh
