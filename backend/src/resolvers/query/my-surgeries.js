import { prisma } from '@';

const mySurgeries = (_, __, { organizationId }) => {
  return prisma.surgery.findMany({
    where: {
      organizationId,
    },
  });
};

export default mySurgeries;
