import { prisma } from '@';

const configuration = (_, __, { userId }) => {
  return prisma.configuration.findUnique({
    where: {
      userId,
    },
  });
};

export default configuration;
