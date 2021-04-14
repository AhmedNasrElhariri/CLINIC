import express from 'express';
import path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import moment from 'moment';
import 'moment-timezone';
import mkdirp from 'mkdirp';
import pdf from 'express-pdf';
import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';

import middlewares from './middlewares';
import { upload } from './services/upload.service';
import { getContextData } from './services/auth.service';

export const UPLOAD_DIR = '/uploads';
mkdirp.sync(path.join(__dirname, UPLOAD_DIR));

export const PDF_DIR = '/pdf';
mkdirp.sync(path.join(__dirname, PDF_DIR));

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
app.use(cors({origin:true,credentials: true}));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));


app.use(fileUpload());

app.post('/upload', async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const areMultipleFiles = Array.isArray(req.files.file);

  let files = areMultipleFiles ? req.files.file : [req.files.file];

  const response = await Promise.all(files.map(f => upload(f)));

  res.send(response);
});
app.use(pdf);
app.get('/pdf', function(req, res){
  res.pdfFromHTML({
      filename: 'generated.pdf',
      html: path.resolve(__dirname, './template.ejs'),
  });
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

server.start(options, ({ port }) => {
  console.log(`Server is running on localhost:${port}`);
  if (process.env.init) {
    console.log('Init Database');
    // seed();
  }
});
