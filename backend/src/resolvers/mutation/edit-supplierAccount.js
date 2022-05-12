import { prisma } from '@';

const editSupplierAccount = async (_, { supplierAccount, type }) => {
  const { id, ...rest } = supplierAccount;
  if (type === 'edit') {
    return prisma.supplierAccount.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.supplierAccount.delete({ where: { id } });
  }
};

export default editSupplierAccount;
