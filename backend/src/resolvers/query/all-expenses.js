import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';
// import { action } from '../permission';

const allExpenses = async (
  _,
  {
    dateFrom,
    dateTo,
    view,
    expenseType,
    doctorId,
    specialtyId,
    branchId,
    expenseName,
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
  return prisma.expense.findMany({
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
      name: {
        contains: expenseName,
        mode: 'insensitive',
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
};

export default allExpenses;
