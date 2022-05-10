import { prisma } from '@';

const myDetailedSupplierAccounts = async (
  _,
  { offset, limit, name },
  { userId, organizationId }
) => {
  const supplierAccounts = await prisma.supplierAccount.findMany({
    where: {
      organizationId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    skip: offset,
    take: limit,
  });
  const supplierAccountsCount = await prisma.supplierAccount.count({
    where: {
      organizationId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  const data = {
    supplierAccounts: supplierAccounts,
    supplierAccountsCount: supplierAccountsCount,
  };
  return data;
};

export default myDetailedSupplierAccounts;
