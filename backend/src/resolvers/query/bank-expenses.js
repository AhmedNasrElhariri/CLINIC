import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

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
  { organizationId }
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
  const bankExpenses = await prisma.bankExpense.findMany({
    where: {
      organizationId,
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
      organizationId,
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
