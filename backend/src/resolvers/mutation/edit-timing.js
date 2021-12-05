import { prisma } from '@';

const editTiming = async (_, { timing, type }) => {
  const { id, ...rest } = timing;
  if (type === 'edit') {
    return prisma.timing.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.timing.delete({ where: { id } });
  }
};

export default editTiming;
