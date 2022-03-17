#!/bin/bash

echo 'fetch latest'
git pull 

echo 'start frontend build'
cd ./frontend
yarn install --frozen-lockfile
echo 'start building...'
yarn build
echo 'frontend built successfullty'

cd ../backend
cp ../../root/.env ./

echo "start backend build env yarn build"
yarn install --frozen-lockfile
echo 'start building...'
npx prisma generate
yarn build

echo 'backend built successfullty'

cp -Rf dist/. ../../root
cd ../../root

prisma migrate deploy
pm2 stop clinicr_qa
pm2 start ecosystem.config.js

echo 'starting ...'

