import { prisma } from '@';

const deleteSupplierAccount = async (_, { id }) => {
  await prisma.supplierInvoiceTransaction.deleteMany({
    where: { supplierInvoice: { supplierId: id } },
  });
  await prisma.supplierInvoice.deleteMany({ where: { supplierId: id } });
  return prisma.supplierAccount.delete({
    where: {
      id,
    },
  });
};

export default deleteSupplierAccount;
