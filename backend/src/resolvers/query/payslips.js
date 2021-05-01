import * as R from 'ramda';

import { prisma } from '@';
import { PAYROLL_STATUS } from '@/utils/constants';

const byUserId = trx => trx.payrollUser.id;
const sumSalary = (payrollUser, trxs = []) => {
  const {
    id,
    user: { name },
  } = payrollUser;
  return {
    id,
    name,
    amount: trxs.reduce((acc, { amount }) => acc + amount, 0),
  };
};

const payslips = async (_, __, { organizationId }) => {
  const users = await prisma.payrollUser.findMany({ include: { user: true } });
  const transactions = await prisma.payrollTransaction.findMany({
    where: {
      payroll: {
        organizationId,
        status: PAYROLL_STATUS.Open,
      },
    },
    include: {
      payrollUser: {
        include: {
          user: true,
        },
      },
    },
  });

  const groupedTrxs = R.groupBy(byUserId)(transactions);

  return users.map(u => {
    const userTrxs = groupedTrxs[u.id];
    return sumSalary(u, userTrxs);
  });
};

export default payslips;
