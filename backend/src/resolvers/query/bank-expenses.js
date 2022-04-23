import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
// import { listFlattenUsersTreeIds } from '@/services/permission.service';
// import { ACTIONS } from '@/utils/constants';

const bankExpenses = async (
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
  },
  { user, organizationId }
) => {
  // const ids = await listFlattenUsersTreeIds(
  //   {
  //     user,
  //     organizationId,
  //     action: ACTIONS.ViewBank_Accounting,
  //   },
  //   true
  // );
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
  const bankExpenses = await prisma.bankExpense.findMany({
    where: {
      // OR: [
      //   {
      //     userId: {
      //       in: ids,
      //     },
      //   },
      //   {
      //     branchId: {
      //       in: ids,
      //     },
      //   },
      //   {
      //     specialtyId: {
      //       in: ids,
      //     },
      //   },
      // ],
      organizationId: organizationId,
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
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      organizationId,
    },
    include: {
      bank: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
    },
    skip: offset,
    take: limit,
  });

  const totalExpenses = await prisma.bankExpense.aggregate({
    sum: {
      amount: true,
    },
    count: {
      id: true,
    },
    where: {
<<<<<<< HEAD
      organizationId,
=======
      organizationId: organizationId,
>>>>>>> 536684a807dd6d5572d7eff8ce134107af2f27be
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
    },
  });
  const sum = totalExpenses.sum.amount;
  const count = totalExpenses.count.id;
  const data = {
    bankExpenses: bankExpenses,
    totalExpenses: sum,
    expensesCount: count,
  };
  return data;
};

export default bankExpenses;
