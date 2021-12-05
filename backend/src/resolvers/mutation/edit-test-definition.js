import { prisma } from '@';

const editLabDefinition = async (_, { labDefinition, type }) => {
  const { id, ...rest } = labDefinition;
  if (type === 'edit') {
    return prisma.labDefinition.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.labDefinition.delete({
      where: {
        id,
      },
    });
  }
};

export default editLabDefinition;
