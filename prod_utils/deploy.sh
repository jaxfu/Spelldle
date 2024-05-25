#!/usr/bin/env bash

set -e

cd .. &&
rm -rf deploy &&
mkdir deploy &&
cp prod_utils/init_db.sh deploy &&
cd api &&
GOOS=linux GOARCH=amd64 go build -o ../deploy/server.exe cmd/server.go &&
cp test.py ../deploy &&
cp init.sql ../deploy &&
cp -r client ../deploy &&
cd .. &&
scp -r deploy/* mfb:~/mfb