import { prisma } from '@';

const items = (_, __, { organizationId }) => {
  return prisma.item.findMany({
    where: {
      organizationId,
    },
  });
};

export default items;
