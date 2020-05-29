import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { ACCESS_TOKEN } from 'utils/constants';
import * as R from 'ramda';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ extensions }) => {
      if (R.propOr('', 'code') === 'UNAUTHENTICATED') {
      }
    });
});

const client = new ApolloClient({
  link: errorLink.concat(
    authLink.concat(createUploadLink({ uri: '/graphql' }))
  ),
  cache: new InMemoryCache(),
});

export default client;
