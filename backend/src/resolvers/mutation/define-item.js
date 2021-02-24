import { prisma } from '@';

const defineItem = async (_, { item }, { userId, organizationId }) => {
  return prisma.item.create({
    data: {
      ...item,
      organization: {
        connect: {
          id: organizationId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default defineItem;
