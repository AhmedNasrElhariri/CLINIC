import { prisma } from '@';

const addImageCategory = async (_, { imageCategory }, { userId ,organizationId}) => {
  return prisma.imageCategory.create({
    data: {
      ...imageCategory,
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addImageCategory;
