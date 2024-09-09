#!/usr/bin/env bash

set -e

export MODE=PROD
export DB_URL=postgres://fraterhqc:habeo@localhost:5432/spelldle
export PORT=:6000
export JWT_SECRET=DoAsThouWiltIsTheWholeOfTheLaw

./spelldle.exe 