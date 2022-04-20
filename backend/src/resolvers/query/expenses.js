import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
// import { listFlattenUsersTreeIds } from '@/services/permission.service';
// import { ACTIONS,POSITION } from '@/utils/constants';
// import { action } from '../permission';

const expenses = async (
  _,
  { offset, limit, dateFrom, dateTo, view, doctorId, specialtyId, branchId },
  { user, organizationId }
) => {
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
  const expenses = await prisma.expense.findMany({
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
      organizationId: organizationId,
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
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
  const totalExpenses = await prisma.expense.aggregate({
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
      organizationId: organizationId,
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
  });
  const sum = totalExpenses.sum.amount;
  const count = totalExpenses.count.id;
  const data = {
    expenses: expenses,
    totalExpenses: sum,
    expensesCount: count,
  };
  return data;
};

export default expenses;
