import { prisma } from '@';

const activeView = async (_, __, { organizationId, userId }) => {
  const users = await prisma.user.findMany({
    where: {
      organizationId,
    },
  });
  const userIds = users.map(u => u.id);
  const viewStatus = await prisma.viewStatus.findMany({
    where: {
      userId: { in: userIds },
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
