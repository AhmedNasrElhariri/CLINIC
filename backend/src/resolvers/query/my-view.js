import { prisma } from '@';

const myView = (_, { id }) => {
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

export default myView;
