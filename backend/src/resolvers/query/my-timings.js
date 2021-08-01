import { prisma } from '@';

const myTimings = (_, __, { userId, organizationId }) => {
  return prisma.timing.findMany({
    where: {
      organizationId,
    },
  });
};

export default myTimings;
