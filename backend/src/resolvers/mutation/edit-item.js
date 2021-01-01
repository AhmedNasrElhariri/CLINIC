import { prisma } from '@';

const updateItem = async (_, { item }) => {
  const { id, ...data } = item;

  return prisma.item.update({
    data: {
      ...data,
    },
    where: {
      id,
    },
  });
};

export default updateItem;
