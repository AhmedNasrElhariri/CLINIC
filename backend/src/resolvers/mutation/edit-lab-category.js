import { prisma } from '@';

const editLabCategory = async (_, { labCategory, type }) => {
  const { id, ...rest } = labCategory;
  if (type === 'edit') {
    return prisma.labCategory.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    await prisma.labDefinition.deleteMany({
      where: {
        categoryId: id,
      },
    });
    return prisma.labCategory.delete({
      where: { id },
    });
  }
};

export default editLabCategory;
