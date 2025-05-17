psql -U postgres -h localhost -c "create database spelldle"
pg_restore -U postgres -h localhost --clean --no-owner -d spelldle -v spelldle_backup.bak
