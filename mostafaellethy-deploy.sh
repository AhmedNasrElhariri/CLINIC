cd frontend
npm install
npm run build
cd ../backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
cp ./node_modules/.prisma/client/query-engine-linux-musl ./dist
cp -v ./deploy_required/* ./dist
cd ..
docker build -t clinicr .
docker save clinicr:latest | gzip > docker_image.tar.gz
sudo rsync -e "ssh -i me.key" -azP docker_image.tar.gz ubuntu@mostafaellethy.com:~/clinicr
sudo rsync -e "ssh -i me.key" -azP backend/.env ubuntu@mostafaellethy.com:~/clinicr
sudo ssh -i me.key ubuntu@mostafaellethy.com "cd clinicr && sudo docker load --input docker_image.tar.gz && sudo docker stop clinicr || true && sudo docker rm clinicr || true && sudo docker run -d --env-file ./.env --name clinicr clinicr"