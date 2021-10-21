import { prisma } from '@';

const MyView = (_, { id }, { userId }) => {
  return prisma.view.findUnique({
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
      id,
    },
  });
};

export default MyView;
