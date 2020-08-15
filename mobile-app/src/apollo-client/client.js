import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { Platform } from 'react-native';

const defaultOptions = {
  query: {
    fetchPolicy: 'cache-and-network',
  },
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
};

const authLink = setContext((_, { headers }) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI1OTUxYS0zYTY5LTQ2ZWUtYWI1Zi1kMGY1MjNkNDYzZGUiLCJvcmdhbml6YXRpb25JZCI6IjQ3MjAyZThjLTg2ZTMtMTFlYS1iYzU1LTAyNDJhYzEzMDAwMyIsImlhdCI6MTU5NTY4NTI2Nn0.e2A-p30mUt10IUOfO4q8wF7FtyhjFfcRbwxuxxmKPfA';

  // const token = localStorage.getItem(ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

console.log(Platform.OS);

// create an apollo link instance, a network interface for apollo client
const httpLink = new HttpLink({
  // uri: `http://localhost:4000/graphql`,
  uri: `http://172.20.10.2:4000/graphql`,
  // uri: `http://192.168.1.14:4000/graphql`,
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
  link: authLink.concat(httpLink),
  cache,
  defaultOptions,
});
export default client;
