import { AuthenticationError } from 'apollo-server-core';
import { rule, shield, allow } from 'graphql-shield';

import { getUserPayloads } from '@/services/auth.service';

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  const { request } = ctx;
  const { userId, organizationId } = getUserPayloads(request);
  ctx.userId = userId;
  ctx.organizationId = organizationId;
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
    fallbackError: new AuthenticationError('Not Authenticated'),
    debug: true,
  }
);
