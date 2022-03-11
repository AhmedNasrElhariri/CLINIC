#!/bin/bash

echo 'fetch latest'
git pull 

echo 'start frontend build'
cd ./frontend
yarn install --frozen-lockfile
yarn build
echo 'frontend built successfullty'

cd ../backend

echo "start backend build env yarn build"

npx prisma generate
yarn install --frozen-lockfile
yarn build

echo 'backend built successfullty'

cp -Rf dist/. ../../root

prisma migrate deploy
pm2 stop clinicr_qa
pm2 start ecosystem.config.js'

echo 'starting ...'

