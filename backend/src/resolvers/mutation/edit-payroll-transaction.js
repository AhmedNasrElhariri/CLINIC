import { prisma } from '@';

const editPayrollTransaction = (_, { id, amount }) => {
  return prisma.payrollTransaction.update({
    data: {
      amount,
    },
    where: {
      id,
    },
  });
};

export default editPayrollTransaction;
