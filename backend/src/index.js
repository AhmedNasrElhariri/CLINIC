import express from 'express';
import path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { AuthenticationError } from 'apollo-server-core';
import moment from 'moment';
import 'moment-timezone';
import { rule, shield, allow } from 'graphql-shield';
import mkdirp from 'mkdirp';

import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';
import { getUserPayloads } from '@/services/auth.service';

export const UPLOAD_DIR = '/uploads';
mkdirp.sync(path.join(__dirname, UPLOAD_DIR));

export const prisma = new PrismaClient();

const options = {
  endpoint: '/graphql',
  playground: '/playground',
};

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  const { request } = ctx;
  const { userId, organizationId } = getUserPayloads(request);
  ctx.userId = userId;
  ctx.organizationId = organizationId;
  return true;
});

moment.tz.setDefault('Africa/Cairo');
moment.updateLocale('en', {
  week: {
    dow: 6,
    doy: 12,
  },
});

const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
      hello: allow,
    },
    Mutation: {
      '*': isAuthenticated,
      login: allow,
      verify: allow,
    },
  },
  {
    fallbackError: new AuthenticationError('Not Authenticated'),
    debug: true,
  }
);

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [permissions],
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
