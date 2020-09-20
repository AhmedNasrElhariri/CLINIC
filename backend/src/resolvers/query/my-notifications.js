import { prisma } from '@';

const myNotifications = (_, __, { userId }) => {
  return prisma.notification.findMany({
    where: {
      userId,
      viewed: false,
    },
    orderBy: {
      date: 'desc',
    },
  });
};

export default myNotifications;
