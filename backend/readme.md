npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate


add file .dev.env to configure you database like 
DATABASE_URL = postgresql://username:password@localhost:5432/clinicr?schema=public