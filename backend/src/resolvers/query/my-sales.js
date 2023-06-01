import { prisma } from '@';
import { ACTIONS, INVENTORY_OPERATION } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
const mySaleses = async (
  _,
  {
    offset,
    limit,
    dateFrom,
    dateTo,
    view,
    doctorId,
    specialtyId,
    branchId,
    itemId,
    creatorId,
  },
  { user, organizationId }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Sales,
    },
    false
  );
  let updatedDateFrom = new Date();
  let updatedDateTo = new Date();
  if (dateFrom && dateTo) {
    updatedDateFrom = getStartOfDay(dateFrom);
    updatedDateTo = getEndOfDay(dateTo);
  } else {
    const datesArray = getDateFromAndDateToFromView(view);
    updatedDateFrom = datesArray[0];
    updatedDateTo = datesArray[1];
  }

  const sales = await prisma.inventoryHistory.findMany({
    where: {
      operation: {
        in: [INVENTORY_OPERATION.SELL, INVENTORY_OPERATION.RECONCILIATE],
      },
      AND: [
        {
          OR: [
            {
              userId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              itemId: itemId,
            },
            {
              userId: creatorId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      item: true,
      user: true,
      branch: true,
      specialty: true,
    },
    skip: offset,
    take: limit,
  });
  const totalSales = await prisma.inventoryHistory.aggregate({
    _sum: {
      totalPrice: true,
      totalCost: true,
      // totalCost: true,
    },
    _count: {
      id: true,
    },
    where: {
      operation: {
        in: [INVENTORY_OPERATION.SELL, INVENTORY_OPERATION.RECONCILIATE],
      },
      AND: [
        {
          OR: [
            {
              userId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId: branchId,
            },
            {
              specialtyId: specialtyId,
            },
            {
              doctorId: doctorId,
            },
            {
              itemId: itemId,
            },
            {
              userId: creatorId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
  });
  const totalPrice = totalSales._sum.totalPrice;
  const salesCount = totalSales._count.id;
  const data = {
    sales: sales,
    totalSalesPrice: totalPrice,
    salesCounts: salesCount,
    totalCost: totalSales._sum.totalCost,
  };
  return data;
};

export default mySaleses;
