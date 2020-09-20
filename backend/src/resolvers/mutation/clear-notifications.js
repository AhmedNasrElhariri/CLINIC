import { prisma } from '@';

const clearNotifications = (_, __, { userId }) => {
  if (!userId) {
    return;
  }
  return prisma.notification
    .deleteMany({
      where: {
        userId,
      },
    })
    .then(() => true)
    .catch(() => false);
};
export default clearNotifications;
