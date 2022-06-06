import { prisma } from '@';

const editInvoiceSupplier = async (
  _,
  { id, supplierId },
  { userId, organizationId }
) => {
  return prisma.supplierInvoice.update({
    data: {
      supplierAccount: {
        connect: {
          id: supplierId,
        },
      },
    },
    where: {
      id: id,
    },
  });
};

export default editInvoiceSupplier;
