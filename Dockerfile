FROM node:12-alpine as build
ENV NODE_OPTIONS=--max_old_space_size=2048
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

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app/backend/dist /app/
RUN npm install pm2 -g
EXPOSE 4000
CMD pm2-runtime ecosystem.config.js