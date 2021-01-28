import { prisma } from '@';

const editTest = async (_, { test }) => {
  const { id, ...rest } = test;

  return prisma.test.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editTest;
