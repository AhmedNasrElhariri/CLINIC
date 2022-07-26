import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, POSITION } from '@/utils/constants';
// import { action } from '../permission';

const expenses = async (
  _,
  {
    offset,
    limit,
    dateFrom,
    dateTo,
    view,
    expenseType,
    doctorId,
    specialtyId,
    branchId,
  },
  { user, organizationId }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Accounting,
    },
    false
  );
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
  const allExpenses = await prisma.expense.findMany({
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
      expenseType: {
        contains: expenseType,
        mode: 'insensitive',
      },
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
    orderBy: {
      date: 'asc',
    },
  });
  const totalExpenses = await prisma.expense.aggregate({
    sum: {
      amount: true,
    },
    count: {
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
      expenseType: {
        contains: expenseType,
        mode: 'insensitive',
      },
    },
  });

  const sum = totalExpenses.sum.amount;
  const count = totalExpenses.count.id;
  const TO = offset + limit;

  const data = {
    expenses: allExpenses.slice(offset, TO),
    allExpenses: allExpenses,
    totalExpenses: sum,
    expensesCount: count,
  };
  return data;
};

export default expenses;
