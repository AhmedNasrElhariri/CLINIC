#!/bin/bash

echo 'start frontend build'
cd frontend
yarn build
echo 'frontend built successfullty'


cd ..

cd backend

echo 'start backend build'
npm run build
echo 'backend built successfullty'

scp -r ./dist/* root@167.71.42.148:/root/clinicr/

ssh root@167.71.42.148 /bin/sh -c '"cd clinicr && pm2 stop all && pm2 start ecosystem.config.js"'