#!/usr/bin/env bash

set -e

export MODE=PROD
export DB_URL=postgres://fraterhqc:habeo@localhost:5432/spelldle
export PORT=:6000
export JWT_SECRET=DoAsThouWiltIsTheWholeOfTheLaw
export GIN_MODE=release

./spelldle.exe 1>>logs/std.txt 2>>logs/err.txt &
