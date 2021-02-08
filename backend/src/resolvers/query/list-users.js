import { prisma } from '@';

const listUsers = (_, { organizationId }) => {
  return prisma.user.findMany({
    where: {
      organizationId,
    },
  });
};

export default listUsers;
