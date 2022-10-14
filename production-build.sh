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
npm install
echo 'start building...'
npm run build
cd ../
echo 'frontend finished successfully'

echo 'start patients app build'
cd ./patients-app
npm install
echo 'start building...'
REACT_APP_GRAPHQL_URL=https://cr-ehr.com npm run build
cd ../
echo 'patients app finished successfully'

echo "start backend build"
cd ./backend
npm install
echo 'start building...'
npx prisma generate
npm run build
cd ../
echo 'backend build finished successfully'

echo 'start sync data to the server'
rm -rf build.zip || true
cd ./backend/dist
zip -r ../../build.zip *
cd ../../
rsync -azP build.zip root@159.223.18.82:~/clinicr

ssh root@159.223.18.82 "cd clinicr &&
 zip -r '../clinicr_backup/$backup_folder.zip' * -x uploads/**\* views/**\* query-engine-debian-openssl-1.1.x build.zip &&
 unzip -o ./build.zip -d . && rm build.zip && prisma migrate deploy && \
 pm2 delete clinicr || true && pm2 delete patients_app || true && \
 pm2 start ecosystem.config.js && pm2 serve patients-app/ 5000 --name "patients_app" --spa
"

rm -rf build.zip || true

echo 'starting ...'
