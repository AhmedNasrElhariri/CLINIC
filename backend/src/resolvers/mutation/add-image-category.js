import { prisma } from '@';

const addImageCategory = async (_, { imageCategory }, { userId }) => {
  return prisma.imageCategory.create({
    data: {
      ...imageCategory,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addImageCategory;
