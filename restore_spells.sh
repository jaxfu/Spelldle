#!/usr/bin/env bash

set -e

pg_restore -U postgres -d spelldle --data-only --schema=spells -F c spells_data_backup.dump