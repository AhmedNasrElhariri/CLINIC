import { prisma } from '@';
import { ACTIONS } from '@/utils/constants';
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

  const sales = await prisma.sales.findMany({
    where: {
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
              salesDefinitionId: itemId,
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
    include: {
      salesDefinition: true,
      user: true,
      branch: true,
      specialty: true,
    },
    skip: offset,
    take: limit,
  });
  const totalSales = await prisma.sales.aggregate({
    _sum: {
      totalPrice: true,
      totalCost: true,
    },
    _count: {
      id: true,
    },
    where: {
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
              salesDefinitionId: itemId,
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
  const totalCost = totalSales._sum.totalCost;
  const salesCount = totalSales._count.id;
  const data = {
    sales: sales,
    totalSalesPrice: totalPrice,
    totalSalesCost: totalCost,
    salesCounts: salesCount,
  };
  return data;
};

export default mySaleses;
