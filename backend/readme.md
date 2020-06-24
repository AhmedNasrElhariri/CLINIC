npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate

pm2 stop all
pm2 start ecosystem.config.js
