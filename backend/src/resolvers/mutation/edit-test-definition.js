import { prisma } from '@';

const editTestDefinition = async (_, { testDefinition }) => {
  const { id, ...rest } = testDefinition;

  return prisma.testDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editTestDefinition;
