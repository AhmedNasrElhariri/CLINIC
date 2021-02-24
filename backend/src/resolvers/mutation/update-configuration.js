import { prisma } from '@';

const updateConfiguration = async (_, { configuration }, { userId }) => {
  const sessions = configuration.sessions || [];

  return prisma.configuration.upsert({
    create: {
      user: {
        connect: {
          id: userId,
        },
      },
      sessions,
    },
    update: {
      sessions,
    },
    where: {
      userId,
    },
  });
};

export default updateConfiguration;
