#!/bin/bash

echo 'fetch latest'
git pull 

echo 'start frontend build'
cd ./frontend
yarn install --frozen-lockfile
echo 'start building...'
yarn build
echo 'frontend built successfullty'

echo 'start patient app build'
cd ./patient-app
yarn install --frozen-lockfile
echo 'start building...'
REACT_APP_GRAPHQL_URL=http://167.71.42.148:8000 yarn build
echo 'patient app built successfullty'

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

pm2 stop patients_app
pm2 serve patients-app/ 5000 --name "patients_app" --spa

echo 'starting ...'

