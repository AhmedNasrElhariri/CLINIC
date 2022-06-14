import { prisma } from '@';

const mySupplierAccounts = (_, __, { userId, organizationId }) => {
  return prisma.supplierAccount.findMany({
    where: {
      organizationId,
    },
  });
};

export default mySupplierAccounts;
