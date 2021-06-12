import { prisma } from '@';
import { PAYROLL_STATUS, PAYROLL_TRANSACTION_TYPE } from '@/utils/constants';
import { normalizeArray } from '@/utils/common';
import { getAllTransactionForCurrentOpenPayslips } from '@/services/payroll.service';

const addPayroll = async (_, { payment }, { userId, organizationId }) => {
  let currentPayroll;
  console.log(payment,'dllllllllll');
  const expenseType = 'Salary';
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
    currentPayroll = payroll;
  } else {
    currentPayroll = payrollRow[0];
  }
  const payrollId = currentPayroll.id;
  const type = PAYROLL_TRANSACTION_TYPE.Salary;

  const users = await prisma.payrollUser
    .findMany({
      where: {
        id: {
          in: payment,
        },
      },
    })
    .then(normalizeArray);

  await Promise.all(
    payment.map(id => {
      const amount = users[id].salary;
      return prisma.payrollTransaction.create({
        data: {
          amount,
          type,
          date: new Date(),
          payrollUser: {
            connect: {
              id,
            },
          },
          payroll: {
            connect: {
              id: payrollId,
            },
          },
        },
      });
    })
  );

  const allTrx = await getAllTransactionForCurrentOpenPayslips(
    organizationId,
    payment,
    false
  );
  await prisma.payrollTransaction.updateMany({
    data: {
      status: 'off',
      added: true,
    },
    where: {
      payrollUser: {
        id: {
          in: payment,
        },
      },
    },
  });
  
  await prisma.expense.createMany({
    data: allTrx.map(({ name, amount }) => ({
      name,
      amount,
      expenseType: expenseType,
      date: new Date(),
      userId,
    })),
  });

  return prisma.payroll.update({
    data: {
      endDate: new Date(),
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
    where: {
      id: payrollId,
    },
  });
};

export default addPayroll;
