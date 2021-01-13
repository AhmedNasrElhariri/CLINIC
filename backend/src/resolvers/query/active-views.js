import { prisma } from '@';

const activeView = async (_, __, { userId }) => {
  const viewStatus = await prisma.viewStatus.findMany({
    where: {
      userId,
    },
  });

  return prisma.view.findMany({
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
      id: {
        in: viewStatus.map(v => v.activeViewId),
      },
    },
  });
};

export default activeView;
