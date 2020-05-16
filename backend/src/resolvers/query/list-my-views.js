import { prisma } from '@';

const listView = (_, __, { userId }) => {
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
    orderBy: {
      id: 'asc',
    },
    where: {
      userId,
    },
  });
};

export default listView;
