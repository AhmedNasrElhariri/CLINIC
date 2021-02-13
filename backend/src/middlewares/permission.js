// import { AuthenticationError } from 'apollo-server-core';
import { rule, shield, allow } from 'graphql-shield';

// import { prisma } from '@';
// import { getUserPayloads } from '@/services/auth.service';
// import { APIExceptcion } from '@/services/erros.service';

const isAuthenticated = rule()(async (parent, args, { user }) => {
  if (user === null) {
    // throw new AuthenticationError();
  }
  return true;
});

// const canCreatePatient = rule()(async (parent, args, { user, ability }) => {
//   console.log({
//     ability: ability.can('create', 'Appointment'),
//   });
//   return ability.can('create', 'Appointments');
// });

// const isAuthenticated = rule({ cache: 'no_cache' })(async (_, __, ctx) => {
//   console.log({ user: ctx.user });
//   return true;
//   // const { request } = ctx;
//   // const { userId, organizationId } = getUserPayloads(request);
//   // const { permissions } = await prisma.user.findOne({ where: { id: userId } });

//   // ctx.userId = userId;
//   // ctx.organizationId = organizationId;
//   // ctx.permissions = permissions;

//   // return true;
// });

export default shield(
  {
    Query: {
      '*': isAuthenticated,
      hello: allow,
      // patients: canCreatePatient,
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
      // if (thrownThing instanceof APIExceptcion) {
      //   return thrownThing;
      // } else if (thrownThing instanceof AuthenticationError) {
      //   return thrownThing;
      // } else {
      //   return new AuthenticationError('not Authenticated');
      // }
    },
    debug: true,
  }
);
