import { onError } from '@apollo/client/link/error';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ACCESS_TOKEN } from 'utils/constants';
import { createUploadLink } from 'apollo-upload-client';

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
  // if (graphQLErrors)
  //   graphQLErrors.map(({ extensions }) => {
  //     if (R.propOr('', 'code') === 'UNAUTHENTICATED') {
  //     }
  //   });
});

const client = new ApolloClient({
  link: errorLink.concat(
    authLink.concat(createUploadLink({ uri: '/graphql' }))
  ),
  cache: new InMemoryCache(),
});

export default client;
