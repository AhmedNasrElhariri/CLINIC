import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { ACTIONS, ORDERBYOPTIONS } from '@/utils/constants';

const revenues = async (
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
    revenueName,
    orderByOption,
  },
  { user, organizationId }
) => {
  let updatedDateFrom = new Date();
  let updatedDateTo = new Date();
  const option = orderByOption
    ? ORDERBYOPTIONS.find(o => o.name === orderByOption)
    : ORDERBYOPTIONS.find(o => o.name === 'date');
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Accounting,
    },
    false
  );
  if (dateFrom && dateTo) {
    updatedDateFrom = getStartOfDay(dateFrom);
    updatedDateTo = getEndOfDay(dateTo);
  } else {
    const datesArray = getDateFromAndDateToFromView(view);
    updatedDateFrom = datesArray[0];
    updatedDateTo = datesArray[1];
  }
  const revenues = await prisma.revenue.findMany({
    where: {
      organizationId: organizationId,
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
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      name: {
        contains: revenueName,
        mode: 'insensitive',
      },
    },
    skip: offset,
    take: limit,
    include: {
      user: true,
      specialty: true,
      branch: true,
      doctor: true,
      patient: true,
    },
    orderBy: option.value,
  });
  const totalRevenues = await prisma.revenue.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: {
      organizationId: organizationId,
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
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      name: {
        contains: revenueName,
        mode: 'insensitive',
      },
    },
  });
  const sum = totalRevenues._sum.amount;
  const count = totalRevenues._count.id;

  const data = {
    revenues: revenues,
    totalRevenues: sum,
    revenuesCount: count,
  };
  return data;
};

export default revenues;
