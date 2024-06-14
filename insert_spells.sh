#!/usr/bin/env bash

set -e

cd db
go build -o insert.exe cmd/main.go
./insert.exe
cd -
