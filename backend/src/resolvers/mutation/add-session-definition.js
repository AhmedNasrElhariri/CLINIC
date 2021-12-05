import { prisma } from '@';

const addSessionDefinition = async (
  _,
  { sessionDefinition },
  { organizationId }
) => {
  const { name, price, duration } = sessionDefinition;
  return prisma.sessionDefinition.create({
    data: {
      name,
      price,
      duration,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addSessionDefinition;
