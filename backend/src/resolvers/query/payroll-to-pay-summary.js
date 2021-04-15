import * as R from 'ramda';

import { prisma } from '@';
import { PAYROLL_STATUS } from '@/utils/constants';

const byUserId = trx => trx.payrollUser.id;
const sumSalary = trxs => {
  const {
    id,
    user: { name },
  } = trxs[0].payrollUser;
  return {
    id,
    name,
    amount: trxs.reduce((acc, { amount }) => acc + amount, 0),
  };
};

const payrollToPaySummary = async (_, __, { organizationId }) => {
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
  return R.map(sumSalary)(Object.values(groupedTrxs));
};

export default payrollToPaySummary;
