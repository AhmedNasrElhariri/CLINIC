import { prisma } from '@';

const activeView = async (_, __, { userId }) => {
  const viewStatus = await prisma.viewStatus
    .findMany({
      where: {
        userId,
      },
    })
    .then(results => results[0]);

  return prisma.view.findOne({
    include: {
      fieldGroups: {
        orderBy: {
          order: 'asc',
        },
        include: {
          fields: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
    where: {
      id: viewStatus.activeViewId,
    },
  });
};

export default activeView;
