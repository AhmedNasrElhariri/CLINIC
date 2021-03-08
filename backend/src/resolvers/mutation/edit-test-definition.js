import { prisma } from '@';

const editLabDefinition = async (_, { labDefinition }) => {
  const { id, ...rest } = labDefinition;

  return prisma.labDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editLabDefinition;
