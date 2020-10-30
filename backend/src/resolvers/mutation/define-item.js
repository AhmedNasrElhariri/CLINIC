import { prisma } from '@';

const defineItem = async (_, { item }, { organizationId }) => {
  return prisma.item.create({
    data: {
      ...item,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default defineItem;
