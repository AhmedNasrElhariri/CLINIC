import { prisma } from '@';

const myExpenseTypesDefinition = (_, __, { organizationId }) => {
  return prisma.expenseTypeDefinition.findMany({
    where: {
        organizationId,
    },
  });
};

export default myExpenseTypesDefinition;
