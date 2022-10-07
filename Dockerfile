FROM node:14-alpine as build
RUN npm install pm2 -g
EXPOSE 4000
WORKDIR /app
COPY backend/dist .
CMD pm2-runtime ecosystem.config.js