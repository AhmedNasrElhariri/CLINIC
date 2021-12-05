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
import cron from 'node-cron';
import initUploadConfig from './conf/upload';
import initReportsConfig from './conf/reports';
import {
  tomorrowAppointmentsReminder,
  before3daysSurgeriesReminder,
  beforeOneDaySurgeryReminder,
  every6HoursAppointmentReminder,
} from './services/cron-jobs';
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

cron.schedule('00 06 * * *', async function () {
  const day = moment(new Date()).subtract(1, 'days').toDate();
  const from = moment(day).startOf('day').toDate();
  const to = moment(day).endOf('day').toDate();
  await prisma.appointment.updateMany({
    where: {
      status: 'Scheduled',
      accounted: false,
      date: {
        lte: to,
        gte: from,
      },
    },
    data: {
      status: 'Missed',
    },
  });
});
///////////////   whatsApp Messages   ////////
cron.schedule('00 06 * * *', async function () {
  tomorrowAppointmentsReminder();
  before3daysSurgeriesReminder();
  beforeOneDaySurgeryReminder();
});
cron.schedule('00 00,06,12,18 * * *', async function () {
  every6HoursAppointmentReminder();
});
//////////////////////////////////////////////////////////
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend')));
  app.get('*', (req, res, next) => {
    if (
      req.url == options.playground ||
      req.url == options.subscriptions ||
      req.url == options.endpoint
    ) {
      return next();
    }
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  });
}
server.start(options, ({ port }) => {
  console.log(`Server is running on localhost:${port}`);
  if (process.env.init) {
    console.log('Init Database');
  }
});
