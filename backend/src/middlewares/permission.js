import { AuthenticationError } from 'apollo-server-core';
import { rule, shield, allow } from 'graphql-shield';

import { getUserPayloads } from '@/services/auth.service';
import { APIExceptcion } from '@/services/erros.service';

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
    fallbackError: thrownThing => {
      if (thrownThing instanceof APIExceptcion) {
        return thrownThing;
      } else if (thrownThing instanceof AuthenticationError) {
        return thrownThing;
      } else {
        return new AuthenticationError('not Authenticated');
      }
    },
    // fallbackError: new AuthenticationError('Not Authenticated'),
    debug: true,
  }
);
