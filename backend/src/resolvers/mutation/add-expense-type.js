import { prisma } from '@';

const addExpenseTypeDefinition = async (
  _,
  { expenseTypeDefinition },
  { organizationId }
) => {
  return prisma.expenseTypeDefinition.create({
    data: {
      ...expenseTypeDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addExpenseTypeDefinition;
