npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate

pm2 stop all
pm2 start ecosystem.config.js
ssh -L 63333:localhost:5432 root@167.71.42.148
