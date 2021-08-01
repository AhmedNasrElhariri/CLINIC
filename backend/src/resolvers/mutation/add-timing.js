import { prisma } from '@';

const addTiming = async (_, { timing }, { userId,organizationId }) => {
  return prisma.timing.create({
    data: {
      ...timing,
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addTiming;
