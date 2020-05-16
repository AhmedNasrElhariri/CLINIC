import { prisma } from '@';

const listViewStatus = (_, __, { userId }) => {
  return prisma.viewStatus
    .findMany({
      where: {
        userId,
      },
    })
    .then(result => (result.length ? result[0] : null));
};

export default listViewStatus;
