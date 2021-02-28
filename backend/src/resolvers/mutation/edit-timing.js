import { prisma } from '@';

const editTiming = async (_, { timing }) => {
  const { id, ...rest } = timing;

  return prisma.timing.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editTiming;
