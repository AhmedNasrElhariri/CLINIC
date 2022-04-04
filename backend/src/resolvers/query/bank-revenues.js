import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';

const bankRevenues = async (
  _,
  { offset, limit, dateFrom, dateTo, view, doctorId, specialtyId, branchId },
  { user, organizationId }
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
  const bankRevenues = await prisma.bankRevenue.findMany({
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
      organizationId,
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
  });
  const totalRevenues = await prisma.bankRevenue.aggregate({
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
