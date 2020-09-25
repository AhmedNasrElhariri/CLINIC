import express from 'express';
import path from 'path';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import fileUpload from 'express-fileupload';

import moment from 'moment';
import 'moment-timezone';
import mkdirp from 'mkdirp';

import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';

import middlewares from './middlewares';
import { upload } from './services/upload.service';
import { getContextData } from './services/auth.service';
import seed from './seed';

export const UPLOAD_DIR = '/uploads';
mkdirp.sync(path.join(__dirname, UPLOAD_DIR));

export const prisma = new PrismaClient();

const options = {
  endpoint: '/graphql',
  playground: '/playground',
};

export const pubsub = new PubSub();

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

app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

app.use(fileUpload());

app.post('/upload', async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let file = req.files.file;

  res.send(await upload(file));
});

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
server.start(options, () => {
  console.log('Server is running on localhost:4000');
  if (process.env.init) {
    console.log('Init Database');
    seed();
  }
});
