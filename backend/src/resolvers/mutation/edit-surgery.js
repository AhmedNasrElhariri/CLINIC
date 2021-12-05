import { prisma } from '@';

const editSurgery = async (_, { surgery, type }) => {
  const { id, ...rest } = surgery;
  if (type === 'edit') {
    return prisma.surgery.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.surgery.delete({
      where: { id },
    });
  }
};

export default editSurgery;
