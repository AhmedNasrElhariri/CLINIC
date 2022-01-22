#!/bin/bash


echo 'start frontend build'
cd ./frontend
yarn build
echo 'frontend built successfullty'

cd ../backend

echo "start backend build env yarn build"

npx prisma generate
yarn build

echo 'backend built successfullty'

# rsync -azP --filter 'protect query-engine-debian-openssl-1.1.x' --filter 'protect ecosystem.config.js' --filter 'protect .env' --filter 'protect uploads' --delete  dist/ root@167.71.42.148:~/clinicr1
# ssh root@167.71.42.148 'cd ~/clinicr1 && prisma migrate deploy && pm2 stop clinicr1 && pm2 start ecosystem.config.js'

echo 'starting ...'

