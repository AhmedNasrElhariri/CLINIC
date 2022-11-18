import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient, ApolloLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getToken } from "services/local-storage";

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink({
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = getToken();
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  },
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
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  ApolloLink.from([
    // errorLink,
    authLink,
    cleanTypeName,
    createUploadLink({
      uri: `${
        process.env.NODE_ENV !== "production"
          ? process.env.REACT_APP_API_ENDPOINT ?? ""
          : ""
      }/graphql`,
    }),
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

export default client;
