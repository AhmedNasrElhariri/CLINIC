import { GraphQLServer } from 'graphql-yoga';
import cookieParser from 'cookie-parser';

import { PrismaClient } from '@prisma/client';
import typeDefs from './schema.gql';
import resolvers from './resolvers';
import { verify } from '@/services/auth.service';

export const prisma = new PrismaClient();

const options = {
  endpoint: '/graphql',
  playground: '/playground',
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request, response }) => ({ request, response }),
});

const app = server.express;

app.use(cookieParser());

app.use((req, _, next) => {
  const token = req.cookies['access-token'];
  const data = verify(token);
  req.userId = data.userId;
  next();
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
