import { prisma } from '@';

const mySessionsDefinition = (_, __, { organizationId }) => {
  return prisma.sessionDefinition.findMany({
    where: {
        organizationId,
    },
  });
};

export default mySessionsDefinition;
