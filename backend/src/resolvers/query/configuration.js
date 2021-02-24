import { prisma } from '@';

const configuration = (_, __, { userId }) => {
  return prisma.configuration.findOne({
    where: {
      userId,
    },
  });
};

export default configuration;
