import { prisma } from '@';
import moment from 'moment';

const doctorFeesTransactions = async (
  _,
  { offset, limit, dateFrom, dateTo, doctorId, status, type },
  { organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const doctorFees = await prisma.doctorFees.findMany({
    where: Object.assign(
      {
        organizationId,
        doctorId,
      },
      dateTo &&
        dateFrom && {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      status && { status },
      type && { referedStatus: type }
    ),
    include: {
      doctor: true,
      session: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      date: 'desc',
    },
  });
  const totalDoctorFees = await prisma.doctorFees.aggregate({
    _sum: {
      amount: true,
      totalPrice: true,
      cost: true,
    },
    _count: {
      id: true,
    },
    where: Object.assign(
      {
        organizationId,
        doctorId,
      },
      dateTo &&
        dateFrom && {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      status && { status },
      type && { referedStatus: type }
    ),
  });
  const sum = totalDoctorFees._sum.amount;
  const count = totalDoctorFees._count.id;
  const totalPrice = totalDoctorFees._sum.totalPrice;
  const totalCost = totalDoctorFees._sum.cost;
  const data = {
    doctorFees: doctorFees,
    totalDoctorFees: sum,
    doctorFeesCount: count,
    totalPrice: totalPrice,
    totalCost: totalCost,
  };
  return data;
};

export default doctorFeesTransactions;
