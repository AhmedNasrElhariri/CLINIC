import { GraphQLServer } from 'graphql-yoga';
import express from 'express';

import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';
import path from 'path';
import authenticate from '@/middlewares/authenticate';

export const prisma = new PrismaClient();

const options = {
  endpoint: '/graphql',
  playground: '/playground',
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
  // middlewares: [authenticate],
});

// server.express.use(express.static(path.join(__dirname, 'build')));
// server.express.get('*', (req, res, next) => {
//   // Handle graphql-yoga specific routes
//   if (
//     req.url == options.playground ||
//     req.url == options.subscriptions ||
//     req.url == options.endpoint
//   ) {
//     return next();
//   }
//   res.sendFile(path.join(__dirname, 'build/index.html'));
// });
// server.express.use(express.static('./build/'));

// server.express.use((req, res, next) => {
//   const { authorization } = req.headers;
//   jwt.verify(authorization, 'secret', (err, decodedToken) => {
//     if (err || !decodedToken) {
//       res.status(401).send('not authorized');
//       return;
//     }
//     next();
//   });
// });

server.start(options, () => console.log('Server is running on localhost:4000'));
