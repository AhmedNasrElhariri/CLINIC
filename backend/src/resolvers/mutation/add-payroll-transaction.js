import { prisma } from '@';
import { PAYROLL_STATUS } from '@/utils/constants';
import moment from 'moment';

const addTransaction = async (
  _,
  { payrollTransaction },
  { organizationId }
) => {
  let { userId, amount, type, reason, periodTime, option } = payrollTransaction;
  let payrollId = '';
  if (type === 'Advance' || type === 'Deduction') {
    amount = amount * -1;
  }
  const payrollRow = await prisma.payroll.findMany({
    where: { status: PAYROLL_STATUS.Open },
  });
  if (payrollRow.length == 0) {
    let date = new Date();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    const payrollDate = 'payment' + '/' + month + '/' + year;
    const payroll = await prisma.payroll.create({
      data: {
        name: payrollDate,
        status: PAYROLL_STATUS.Open,
        startDate: date,
        endDate: date,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
    payrollId = payroll.id;
    if (periodTime.length > 0 && option === 'courses') {
      const TimeFramedate = periodTime[1];
      const newTimeFrameDate = moment(TimeFramedate).add(1, 'days').toDate();
      await prisma.transactionCoursesTimeFrame.upsert({
        where: {
          payrollUserId: userId,
        },
        update: { date: newTimeFrameDate },
        create: {
          date: newTimeFrameDate,
          payrollUser: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    if (periodTime.length > 0 && option === 'percentage') {
      const TimeFramedate = periodTime[1];
      await prisma.transactionRevenuesTimeFrame.upsert({
        where: {
          payrollUserId: userId,
        },
        update: { date: TimeFramedate },
        create: {
          date: TimeFramedate,
          payrollUser: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    return prisma.payrollTransaction.create({
      data: {
        amount: amount,
        type: type,
        reason: reason,
        date: new Date(),
        payrollUser: {
          connect: {
            id: userId,
          },
        },
        payroll: {
          connect: {
            id: payrollId,
          },
        },
      },
    });
  } else {
    payrollId = payrollRow[0].id;
    if (periodTime.length > 0 && option === 'courses') {
      const TimeFramedate = periodTime[1];
      const newTimeFrameDate = moment(TimeFramedate).add(1, 'days').toDate();
      await prisma.transactionCoursesTimeFrame.upsert({
        where: {
          payrollUserId: userId,
        },
        update: { date: newTimeFrameDate },
        create: {
          date: newTimeFrameDate,
          payrollUser: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    if (periodTime.length > 0 && option === 'percentage') {
      const TimeFramedate = periodTime[1];
      await prisma.transactionRevenuesTimeFrame.upsert({
        where: {
          payrollUserId: userId,
        },
        update: { date: TimeFramedate },
        create: {
          date: TimeFramedate,
          payrollUser: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    return prisma.payrollTransaction.create({
      data: {
        amount: amount,
        type: type,
        reason: reason,
        date: new Date(),
        payrollUser: {
          connect: {
            id: userId,
          },
        },
        payroll: {
          connect: {
            id: payrollId,
          },
        },
      },
    });
  }
};

export default addTransaction;
