import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient, ApolloLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
// import * as ls from 'services/local-storage';

export const ACCESS_TOKEN = "access-token";
// export const getToken = () => get(ACCESS_TOKEN);

// const authLink = setContext((_, { headers }) => {
//   // const token = getToken();
//   const token = {};
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const errorLink = onError(({ graphQLErrors, operation }) => {
//   // if (graphQLErrors)
//   //   graphQLErrors.map(({ extensions }) => {
//   //     if (R.propOr('', 'code') === 'UNAUTHENTICATED') {
//   //     }
//   //   });
// });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  // options: {
  //   reconnect: true,
    // connectionParams: async () => {
    //   // const token = getToken();
    //   const token = {};
    //   return {
    //     headers: {
    //       authorization: token ? `Bearer ${token}` : "",
    //     },
    //   };
    // },
  // },
});

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map((data) => {
    return data;
  });
});

const link = split(
  // split based on operation type
  ({ query }) => {
    
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" ;
  },
  wsLink,
  ApolloLink.from([
    // errorLink,
    // authLink,
    // cleanTypeName,
    createUploadLink({ uri: "/graphql" }),
  ])
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
// const client = new ApolloClient({
//   uri: `ws://localhost:4000/`,
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: "cache-and-network",
//     },
//   },
// });

export default client;
