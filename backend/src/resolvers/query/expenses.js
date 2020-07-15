import { prisma } from '@';

const expenses = (_, { clinicId }) => {
  return prisma.expense.findMany({
    where: {
      clinicId,
    },
  });
};

export default expenses;
