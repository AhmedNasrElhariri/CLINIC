import { prisma } from '@';

const addLabCategory = async (_, { labCategory }, { userId }) => {
  return prisma.labCategory.create({
    data: {
      ...labCategory,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addLabCategory;
