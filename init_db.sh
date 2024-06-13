#!/usr/bin/env bash

set -e

export PGPASSWORD=password
cd config/sql
psql -U postgres -h localhost -p 5432 -d spelldle -f init.sql
cd -
