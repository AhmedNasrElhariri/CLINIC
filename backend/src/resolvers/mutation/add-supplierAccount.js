import { prisma } from '@';

const addSupplierAccount = async (
  _,
  { supplierAccount },
  { userId, organizationId }
) => {
  return prisma.supplierAccount.create({
    data: {
      ...supplierAccount,
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addSupplierAccount;
