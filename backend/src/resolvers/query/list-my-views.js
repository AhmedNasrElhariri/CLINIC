import { prisma } from '@';

const listView = async (_, __, { organizationId }) => {
  const users = await prisma.user.findMany({
    where: {
      organizationId,
    },
  });
  const userIds = users.map(u => u.id);
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
      user: {
        id: { in: userIds },
      },
    },
  });
};

export default listView;
