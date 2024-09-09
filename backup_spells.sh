#!/usr/bin/env bash

set -e

pg_dump -U postgres -d spelldle -n spells --data-only -F c -f spells_data_backup.dump
