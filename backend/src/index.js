import express from 'express';
import path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import cors from 'cors';
import moment from 'moment';
import 'moment-timezone';
import mkdirp from 'mkdirp';
import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';
import middlewares from './middlewares';
import { getContextData } from './services/auth.service';

import initUploadConfig from './conf/upload';
import initReportsConfig from './conf/reports';

export const UPLOAD_DIR = '/uploads';
mkdirp.sync(path.join(__dirname, UPLOAD_DIR));

export const prisma = new PrismaClient();
export const pubsub = new RedisPubSub();

const options = {
  port: process.env.APP_PORT || 4000,
  endpoint: '/graphql',
  playground: '/playground',
};

moment.tz.setDefault('Africa/Cairo');
moment.updateLocale('en', {
  week: {
    dow: 6,
    doy: 12,
  },
});

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares,
  context: async ctx => ({
    ...ctx,
    pubsub,
    ...(await getContextData(ctx)),
  }),
});

const app = server.express;
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));
initUploadConfig(app);
initReportsConfig(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res, next) => {
    if (
      req.url == options.playground ||
      req.url == options.subscriptions ||
      req.url == options.endpoint
    ) {
      return next();
    }
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

server.start(options, ({ port }) => {
  console.log(`Server is running on localhost:${port}`);
  if (process.env.init) {
    console.log('Init Database');
  }
});
