import { prisma } from '@';

const myDetailedSupplierAccounts = (_, __, { userId, organizationId }) => {
  return prisma.supplierAccount.findMany({
    where: {
      organizationId,
    },
  });
};

export default myDetailedSupplierAccounts;
