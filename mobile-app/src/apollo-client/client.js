import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_TOKEN } from '@/utils/constants';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token)}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: `http://192.168.1.14:4000/graphql`,
  // uri: `https://clinicr.net/graphql`,
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
