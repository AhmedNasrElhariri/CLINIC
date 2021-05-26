import { prisma } from '@';

const mySalesesDefinition = (_, __, { organizationId }) => {
  return prisma.salesDefinition.findMany({
    where: {
      organizationId,
    },
  });
};

export default mySalesesDefinition;
