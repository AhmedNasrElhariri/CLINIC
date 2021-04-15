import { prisma } from '@';

const listUsers = (_, __,{ organizationId }) => {
  return prisma.user.findMany({
    where: {
      organizationId,
    },
  });
};

export default listUsers;
