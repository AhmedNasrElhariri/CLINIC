import { prisma } from '@';

const addTiming = async (_, { timing }, { userId }) => {
  return prisma.timing.create({
    data: {
      ...timing,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addTiming;
