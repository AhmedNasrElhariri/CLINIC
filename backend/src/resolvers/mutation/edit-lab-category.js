import { prisma } from '@';

const editLabCategory = async (_, { labCategory }) => {
  const { id, ...rest } = labCategory;

  return prisma.labCategory.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editLabCategory;
