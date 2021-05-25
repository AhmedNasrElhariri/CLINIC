import { prisma } from '@';

const editSessionDefinition = async (_, { sessionDefinition }) => {
  const { id, ...rest } = sessionDefinition;

  return prisma.sessionDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editSessionDefinition;
