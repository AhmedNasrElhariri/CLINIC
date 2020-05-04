import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const defaultOptions = {
  query: {
    fetchPolicy: 'network-only',
  },
};

// create an apollo link instance, a network interface for apollo client
const httpLink = new HttpLink({
  // uri: `http://localhost:4000/graphql`,
  uri: `http://192.168.1.12:4000/graphql`,
  // uri: `http://192.168.1.12:4000/graphql`,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions,
});
export default client;
