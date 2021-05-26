import { prisma } from '@';

const configuration = (_, __, { organizationId }) => {
  return prisma.configuration.findUnique({
    where: {
      organizationId,
    },
  });
};

export default configuration;
