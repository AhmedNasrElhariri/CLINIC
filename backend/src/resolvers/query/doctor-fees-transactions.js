import { prisma } from '@';
import moment from 'moment';

const doctorFeesTransactions = async (
  _,
  { offset, limit, dateFrom, dateTo, doctorId, status },
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
      status && { status }
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
      status && { status }
    ),
  });
  const sum = totalDoctorFees._sum.amount;
  const count = totalDoctorFees._count.id;
  const data = {
    doctorFees: doctorFees,
    totalDoctorFees: sum,
    doctorFeesCount: count,
  };
  return data;
};

export default doctorFeesTransactions;
