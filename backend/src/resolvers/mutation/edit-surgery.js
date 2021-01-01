import { prisma } from '@';

const editSurgery = async (_, { surgery }) => {
  const { id, ...rest } = surgery;

  return prisma.surgery.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editSurgery;
