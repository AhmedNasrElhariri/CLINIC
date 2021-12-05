import { prisma } from '@';

const editImageCategory = async (_, { imageCategory, type }) => {
  const { id, ...rest } = imageCategory;
  if (type === 'edit') {
    return prisma.imageCategory.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    await prisma.imageDefinition.deleteMany({ where: { categoryId: id } });
    return prisma.imageCategory.delete({ where: { id } });
  }
};

export default editImageCategory;
