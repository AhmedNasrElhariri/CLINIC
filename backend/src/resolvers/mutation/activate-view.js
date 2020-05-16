import { prisma } from '@';

const setActiveView = async (_, { viewId }, { userId }) => {
  const viewStatus = await prisma.viewStatus
    .findMany({
      where: {
        userId,
      },
    })
    .then(results => results[0]);

  return prisma.viewStatus.update({
    data: {
      activeView: {
        connect: {
          id: viewId,
        },
      },
    },
    where: { id: viewStatus.id },
  });
};

export default setActiveView;
