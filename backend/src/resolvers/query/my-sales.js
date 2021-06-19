import { prisma } from '@';

const mySaleses = (_, __, { organizationId }) => {
  return prisma.sales.findMany({
    where: {
      organizationId,
    },
    include: {
      salesDefinition: true,
      user: true,
    },
  });
};

export default mySaleses;
