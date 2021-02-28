import { prisma } from '@';

const myTimings = (_, __, { userId }) => {
  return prisma.timing.findMany({
    where: {
      userId,
    },
  });
};

export default myTimings;
