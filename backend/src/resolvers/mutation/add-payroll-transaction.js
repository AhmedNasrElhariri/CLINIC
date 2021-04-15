import { prisma } from '@';
import { PAYROLL_STATUS } from '@/utils/constants';

const addTransaction = async (
  _,
  { payrollTransaction },
  { organizationId }
) => {
  let { userId, amount, type } = payrollTransaction;
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
    return prisma.payrollTransaction.create({
      data: {
        amount: amount,
        type: type,
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
    return prisma.payrollTransaction.create({
      data: {
        amount: amount,
        type: type,
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
