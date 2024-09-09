#!/usr/bin/env bash

set -e

cd .. &&
mkdir deploy &&
cp prod_utils/* deploy &&
rm deploy/deploy.sh &&
cd server &&
GOOS=linux GOARCH=amd64 go build -o ../deploy/spelldle.exe cmd/server.go &&
cd .. &&
rsync -avz deploy/* jfdev:/home/fraterhqc/spelldle &&
rm -rf deploy