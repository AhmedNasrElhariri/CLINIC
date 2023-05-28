import { prisma } from '@';
import { mapHistoryToMessage } from '@/services/inventory.service';
import { INVENTORY_OPERATION } from '@/utils/constants';

const inventoryHistoryData = async (_, { isSelling }, { organizationId }) => {
  const history = await prisma.inventoryHistory
    .findMany({
      where: Object.assign(
        {
          organizationId,
        },
        isSelling && { operation: INVENTORY_OPERATION.SELL }
      ),
      orderBy: {
        date: 'desc',
      },
      include: {
        item: true,
        patient: true,
        doctor: true,
        branch: true,
        specialty: true,
      },
    })
    .then(history => {
      return mapHistoryToMessage(history);
    });
  return history;
};

export default inventoryHistoryData;
