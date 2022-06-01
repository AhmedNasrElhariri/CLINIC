import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { ACTIONS } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';

const bankRevenues = async (
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
    bankId,
    revenueName,
  },
  { organizationId, user }
) => {
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
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.ViewBank_Accounting,
    },
    false
  );
  console.log(ids, 'idspppppppppppppp');
  const bankRevenues = await prisma.bankRevenue.findMany({
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
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
              bankId: bankId,
            },
            {
              name: {
                contains: revenueName,
                mode: 'insensitive',
              },
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
      bank: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
      patient: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      date: 'asc',
    },
  });
  const totalRevenues = await prisma.bankRevenue.aggregate({
    sum: {
      amount: true,
    },
    count: {
      id: true,
    },
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
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
              bankId: bankId,
            },
            {
              name: {
                contains: revenueName,
                mode: 'insensitive',
              },
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
  const sum = totalRevenues.sum.amount;
  const count = totalRevenues.count.id;
  const data = {
    bankRevenues: bankRevenues,
    totalRevenues: sum,
    revenuesCount: count,
  };
  return data;
};

export default bankRevenues;
