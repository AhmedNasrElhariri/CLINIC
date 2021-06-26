import { prisma } from '@';

const mySalesesDefinition = (_, __, { organizationId }) => {
  return prisma.salesDefinition.findMany({
    where: {
      organizationId,
    },
    include: {
      user: true,
      specialty: true,
      branch: true,
    },
  });
};

export default mySalesesDefinition;
