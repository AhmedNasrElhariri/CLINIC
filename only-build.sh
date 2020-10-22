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

