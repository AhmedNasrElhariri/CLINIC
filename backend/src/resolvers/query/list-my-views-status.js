import { prisma } from '@';

const listViewStatus = (_, __, { userId }) => {
  return prisma.viewStatus.findMany({
    where: {
      userId,
    },
  });
};

export default listViewStatus;
