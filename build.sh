#!/bin/bash

echo 'start frontend build'
cd frontend
yarn build
echo 'frontend built successfullty'


cd ..

cd backend

echo 'start backend build'
yarn build
echo 'backend built successfullty'

#scp -rp dist/ root@167.71.42.148:/root/clinicr/
ssh root@167.71.42.148 /bin/sh -c '"rm -rf  ~/clinicr && mkdir clinicr"'
rsync -av --progress ../ecosystem.config.js root@167.71.42.148:/root/clinicr/
rsync -av --progress dist/ root@167.71.42.148:/root/clinicr/


ssh root@167.71.42.148 /bin/sh -c '"cd clinicr && prisma migrate up --experimental && pm2 stop all && pm2 start ecosystem.config.js"'
