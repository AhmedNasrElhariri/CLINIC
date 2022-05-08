import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  from,
} from '@apollo/client';

export const ACCESS_TOKEN = 'access-token';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem(ACCESS_TOKEN) || null,
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${
    process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4000'
  }/graphql`,
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
