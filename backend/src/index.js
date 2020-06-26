import express from 'express';
import path from 'path';
import { GraphQLServer } from 'graphql-yoga';

import moment from 'moment';
import 'moment-timezone';
import mkdirp from 'mkdirp';

import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';

import middlewares from './middlewares';

export const UPLOAD_DIR = '/uploads';
mkdirp.sync(path.join(__dirname, UPLOAD_DIR));

export const prisma = new PrismaClient();

const options = {
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
  context: ({ request }) => ({ request }),
});

const app = server.express;

app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

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
server.start(options, () => console.log('Server is running on localhost:4000'));
