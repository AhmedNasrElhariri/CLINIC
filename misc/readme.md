npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate

pm2 stop all
pm2 start ecosystem.config.js
ssh -L 63333:localhost:5432 root@167.71.42.148

DATABASE_URL = postgresql://admin:admin@localhost:5432/clinicr?schema=public

DATABASE_URL = postgresql://doadmin:e6qro1g7jzmvm0f8@db-postgresql-fra1-13324-do-user-4250315-0.b.db.ondigitalocean.com:25060/clinicr?schema=public&sslmode=require

