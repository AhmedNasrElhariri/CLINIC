import { rule, shield, allow } from 'graphql-shield';

const isAuthenticated = rule()(async (parent, args, { user }) => {
  if (user === null) {
    // throw new AuthenticationError();
  }
  return true;
});

export default shield(
  {
    Query: {
      '*': isAuthenticated,
      hello: allow,
    },
    Mutation: {
      '*': isAuthenticated,
      login: allow,
      verify: allow,
    },
  },
  {
    fallbackError: thrownThing => {
      return thrownThing;
    },
    debug: true,
  }
);
