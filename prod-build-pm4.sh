#!/bin/bash

while getopts b: flag
do
    case "${flag}" in
        b) branch=${OPTARG};;
    esac
done

echo "Branch: $branch";

[ -z "$branch" ] && { echo "Branch argument is empty, please enter valid one"; exit 1; }


backup_folder=$(date +"%d-%m-%Y %H:%M")

git fetch --all
git checkout $branch
git pull origin $branch

echo 'start frontend build'
cd ./frontend
npm ci
echo 'start building...'
npm run build
cd ../
echo 'frontend finished successfully'

echo 'start patients app build'
cd ./patients-app
npm ci
echo 'start building...'
REACT_APP_GRAPHQL_URL=https://chr-ring.com npm run build
cd ../
echo 'patients app finished successfully'

[ -d "./temp" ] && rm -r ./temp

mkdir temp
cp -r ./frontend/build ./temp/frontend
cp -r ./patients-app/build ./temp/patients-app
cp -r ./backend/src ./temp/src
cp -r ./backend/prisma ./temp/prisma
cp -r ./backend/package.json ./temp/package.json
cp -r ./backend/webpack.common.js ./temp/webpack.common.js
cp -r ./backend/webpack.dev.js ./temp/webpack.dev.js

echo 'start sync data to the server'
test -f ./build.zip && rm ./build.zip
cd ./temp
zip -r ../build.zip *
cd ../
rsync -azP build.zip root@159.223.18.82:~/clinicr

ssh root@159.223.18.82 "cd clinicr &&
 zip -r '../clinicr_backup/$backup_folder.zip' * -x node_modules/**\* uploads/**\* views/**\* query-engine-debian-openssl-1.1.x build.zip &&
 unzip -o ./build.zip -d . && rm build.zip && prisma migrate deploy && \
 pm2 delete clinicr || true && pm2 delete patients_app || true && \
 npm install && npx prisma generate && npx webpack --mode='production' --config ./webpack.dev.js && \
 cp -r ./frontend ./server-dist/frontend && \
"

ssh root@164.90.178.150 "cd clinicr &&
 pm2 start ecosystem.config.js && pm2 serve patients-app/ 5000 --name "patients_app" --spa
"

echo 'starting ...'

