import { prisma } from '@';
import { mapHistoryToMessage } from '@/services/inventory.service';

const inventoryHistory = (_, { clinicId }) => {
  return prisma.inventoryHistory
    .findMany({
      where: {
        clinicId,
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
