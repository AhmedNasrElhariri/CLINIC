import { prisma } from '@';
// import { listFlattenUsersTreeIds } from '@/services/permission.service';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
// import { ACTIONS, POSITION } from '@/utils/constants';

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
  },
  { user, organizationId }
) => {
  let updatedDateFrom = new Date();
  let updatedDateTo = new Date();
  // const ids = await listFlattenUsersTreeIds(
  //   {
  //     user,
  //     organizationId,
  //     action: ACTIONS.View_Accounting,
  //   },
  //   true
  // );
  // const condition =
  //   user.position === POSITION.Admin || user.position === POSITION.Assistant
  //     ? {
  //         userId: {
  //           in: ids,
  //         },
  //       }
  //     : {
  //         doctorId: {
  //           in: ids,
  //         },
  //       };
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
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      organizationId: organizationId,
      name: {
        contains: revenueName,
        mode: 'insensitive',
      },
    },
    include: {
      user: true,
      specialty: true,
      branch: true,
      doctor: true,
    },
    skip: offset,
    take: limit,
  });
  const totalRevenues = await prisma.revenue.aggregate({
    sum: {
      amount: true,
    },
    count: {
      id: true,
    },
    where: {
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
  const sum = totalRevenues.sum.amount;
  const count = totalRevenues.count.id;
  const data = {
    revenues: revenues,
    totalRevenues: sum,
    revenuesCount: count,
  };
  return data;
};

export default revenues;
