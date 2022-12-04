import { prisma } from '@';

const addSessionDefinition = async (
  _,
  { sessionDefinition },
  { organizationId }
) => {
  const { name, ...rest } = sessionDefinition;
  return prisma.sessionDefinition.create({
    data: {
      name,
      ...rest,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addSessionDefinition;
