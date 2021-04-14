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
import htmlToPdfmake from 'html-to-pdfmake';
var fs = require('fs');
var pdfMake = require('pdfmake/build/pdfmake');
var pdfFonts = require('pdfmake/build/vfs_fonts');

import normal from './assets/fonts/Roboto-Regular.ttf';
import bold from './assets/fonts/Roboto-Regular.ttf';
import italics from './assets/fonts/Roboto-Regular.ttf';
import bolditalics from './assets/fonts/Roboto-Regular.ttf';

var PdfPrinter = require('pdfmake');
var fonts = {
  Roboto: {
    normal,
    bold,
    italics,
    bolditalics,
  },
};

var printer = new PdfPrinter(fonts);
var fs = require('fs');

import jsdom from 'jsdom';
const { JSDOM } = jsdom;
const { window } = new JSDOM('');

export const UPLOAD_DIR = '/uploads';
mkdirp.sync(path.join(__dirname, UPLOAD_DIR));

export const PDF_DIR = '/pdf';
mkdirp.sync(path.join(__dirname, PDF_DIR));

export const prisma = new PrismaClient();
export const pubsub = new RedisPubSub();

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

app.get('/pdf', function (req, res) {
  const html = htmlToPdfmake(`<div>the html code</div>`, { window });
  var docDefinition = {
    content: [html],
  };

  var options = {};

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(res);
  pdfDoc.end();
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
