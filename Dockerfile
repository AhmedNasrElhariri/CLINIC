FROM node:12-alpine as build
EXPOSE 4000
RUN npm install pm2 -g
WORKDIR /app/frontend
COPY ./frontend/package.json .
RUN npm install
COPY ./frontend .
RUN npm run build
WORKDIR /app/backend
COPY ./backend/package.json .
RUN npm install
COPY ./backend .
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
RUN mv -v ./deploy_required/* ./dist
WORKDIR /app/backend/dist
RUN cp ../node_modules/@prisma/engines/query-engine-linux-musl .
CMD pm2-runtime ecosystem.config.js