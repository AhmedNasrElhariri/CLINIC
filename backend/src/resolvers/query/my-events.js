import { prisma } from '@';

const myEvents = (_, __, { userId }) => {
  return prisma.event.findMany({
    where: {
      userId,
    },
  });
};

export default myEvents;
