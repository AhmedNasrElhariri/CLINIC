import * as R from 'ramda';

import { prisma } from '@';
import { PAYROLL_STATUS } from '@/utils/constants';

const byUserId = trx => trx.payrollUser.id;
const sumSalary = (payrollUser, trxs = [], includeExtraSalary = true) => {
  const { id, salary, user } = payrollUser;
  const name = user.name;
  return {
    id,
    name,
    amount:
      trxs.reduce((acc, { amount }) => acc + amount, 0) +
      (includeExtraSalary ? salary : 0),
  };
};

export const getAllTransactionForCurrentOpenPayslips = async (
  organizationId,
  payment,
  includeExtraSalary
) => {
  const users = await prisma.payrollUser.findMany({
    where: {
      id: {
        in: payment,
      },
    },
    include: {
      user: true,
    },
  });
  const transactions = await prisma.payrollTransaction.findMany({
    where: {
      payroll: {
        organizationId,
        status: PAYROLL_STATUS.Open,
      },
      payrollUserId: {
        in: payment,
      },
      status: 'on',
      added: false,
    },
    include: {
      payrollUser: true,
    },
  });
  const groupedTrxs = R.groupBy(byUserId)(transactions);
  return users.map(u => {
    const userTrxs = groupedTrxs[u.id];
    return sumSalary(u, userTrxs, includeExtraSalary);
  });
};
