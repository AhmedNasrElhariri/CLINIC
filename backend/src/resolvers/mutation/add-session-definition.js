import { prisma } from '@';

const addSessionDefinition = async (_, { sessionDefinition }, { organizationId }) => {
  return prisma.sessionDefinition.create({
    data: {
      ...sessionDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addSessionDefinition;
