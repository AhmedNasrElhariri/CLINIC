import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { prisma } from '@';
const mapTypes = (transactions = [], type) =>
  transactions.map(transaction => ({ ...transaction, type }));
const accountingData = async (
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
    name,
    accountingOption,
    transactionType,
    bankId,
  },
  { organizationId }
) => {
  let updatedDateFrom = new Date();
  let updatedDateTo = new Date();
  let transactions = [];
  let totalAmount = 0;

  if (dateFrom && dateTo) {
    updatedDateFrom = getStartOfDay(dateFrom);
    updatedDateTo = getEndOfDay(dateTo);
  } else {
    const datesArray = getDateFromAndDateToFromView(view);
    updatedDateFrom = datesArray[0];
    updatedDateTo = datesArray[1];
  }
  const accountingOptions = accountingOption
    ? [accountingOption]
    : ['cash', 'visa'];

  const accountingOptionsVsModel = {
    cash: {
      revenue: prisma.revenue.findMany,
      expense: prisma.expense.findMany,
    },
    visa: {
      revenue: prisma.bankRevenue.findMany,
      expense: prisma.bankExpense.findMany,
    },
  };
  if (accountingOptions.includes('cash')) {
    const revenues = await accountingOptionsVsModel['cash'][transactionType]({
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
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    transactions.push(...mapTypes(revenues, 'cash'));
  }

  if (accountingOptions.includes('visa')) {
    const bankRevenues = await accountingOptionsVsModel['visa'][
      transactionType
    ]({
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
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    transactions.push(...mapTypes(bankRevenues, 'visa'));
  }

  totalAmount = transactions.reduce((acc, { amount }) => acc + amount, 0);
  transactions.sort((a, b) => b.date - a.date);
  const data = {
    data: transactions.slice(offset, offset + limit),
    total: totalAmount,
    count: transactions.length,
  };
  return data;
};

export default accountingData;
