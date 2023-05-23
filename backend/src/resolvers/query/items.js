import { prisma } from '@';

const items = (_, __, { organizationId }) => {
  return prisma.item.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export default items;
