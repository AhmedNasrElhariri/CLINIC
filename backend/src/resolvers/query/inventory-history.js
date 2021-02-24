import { prisma } from '@';
import { mapHistoryToMessage } from '@/services/inventory.service';

const inventoryHistory = (_, __, { userId }) => {
  return prisma.inventoryHistory
    .findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        item: true,
        patient: true,
      },
    })
    .then(history => {
      return mapHistoryToMessage(history);
    });
};

export default inventoryHistory;
