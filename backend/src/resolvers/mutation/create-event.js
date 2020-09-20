import { prisma } from '@';

const createEvent = async (_, { event }, { userId }) => {
  return prisma.event.create({
    data: {
      ...event,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default createEvent;
