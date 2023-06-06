import { prisma } from '@';
import { getEndOfDay, getStartOfDay } from '@/services/date.service';
import { mapHistoryToMessage } from '@/services/inventory.service';
import { INVENTORY_OPERATION } from '@/utils/constants';

const inventoryHistoryData = async (
  _,
  { isSelling, itemId, dateFrom, dateTo, offset, limit },
  { organizationId }
) => {
  const history = await prisma.inventoryHistory
    .findMany({
      where: Object.assign(
        {
          organizationId,
        },
        isSelling && {
          operation: {
            in: [INVENTORY_OPERATION.SELL, INVENTORY_OPERATION.RECONCILIATE],
          },
        },
        itemId && { itemId: itemId },
        dateFrom && {
          date: { gte: getStartOfDay(dateFrom), lte: getEndOfDay(dateTo) },
        }
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
      skip: offset,
      take: limit,
    })
    .then(history => {
      return mapHistoryToMessage(history);
    });
  const inventoryCounts = await prisma.inventoryHistory.aggregate({
    _count: {
      id: true,
    },
    where: Object.assign(
      {
        organizationId,
      },
      isSelling && {
        operation: {
          in: [INVENTORY_OPERATION.SELL, INVENTORY_OPERATION.RECONCILIATE],
        },
      },
      itemId && { itemId: itemId },
      dateFrom && {
        date: { gte: getStartOfDay(dateFrom), lte: getEndOfDay(dateTo) },
      }
    ),
  });

  return { history: history, inventoryCounts: inventoryCounts._count.id };
};

export default inventoryHistoryData;
