import { prisma } from '@';

const listView = () => {
  return prisma.fieldGroup.findMany({
    include: {
      fields: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });
};

export default listView;
