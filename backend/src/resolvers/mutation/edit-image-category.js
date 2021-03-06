import { prisma } from '@';

const editImageCategory = async (_, { imageCategory }) => {
  const { id, ...rest } = imageCategory;

  return prisma.imageCategory.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editImageCategory;
