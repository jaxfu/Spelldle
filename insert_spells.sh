#!/usr/bin/env bash

set -e

cd insert_spells
go build -o insert.exe cmd/main.go
./insert.exe
cd -
