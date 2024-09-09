#!/usr/bin/env bash

set -e

cd .. &&
rm -rf deploy &&
mkdir deploy &&
cp prod_utils/* deploy &&
rm deploy/deploy.sh &&
cd server &&
GOOS=linux GOARCH=amd64 go build -o ../deploy/server.exe cmd/server.go &&
cd .. &&
rsync -avz deploy/* jfdev:/home/fraterhqc/spelldle