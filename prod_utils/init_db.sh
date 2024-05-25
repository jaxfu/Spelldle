#!/usr/bin/env bash

set -e

export PGPASSWORD=password &&
psql -h localhost -d mfb -U postgres -p 5432 -a -w -f init.sql