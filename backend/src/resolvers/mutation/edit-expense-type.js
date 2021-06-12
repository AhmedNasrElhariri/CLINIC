import { prisma } from '@';

const editExpenseTypeDefinition = async (_, { expenseTypeDefinition }) => {
  const { id, ...rest } = expenseTypeDefinition;

  return prisma.expenseTypeDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editExpenseTypeDefinition;
