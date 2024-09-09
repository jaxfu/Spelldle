#!/usr/bin/env bash

set -e

export MODE=DEV
export DB_URL=postgres://postgres:password@localhost:5432/spelldle
export PORT=:6000
export JWT_SECRET=DoAsThouWiltIsTheWholeOfTheLaw

./server.exe 