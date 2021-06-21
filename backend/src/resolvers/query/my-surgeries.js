import { prisma } from '@';

const mySurgeries = (_, __, { organizationId }) => {
  return prisma.surgery.findMany({
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

export default mySurgeries;
