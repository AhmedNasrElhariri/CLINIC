import { prisma } from '@';

const mySupplierInvoices = (_, { supplierId }, { userId, organizationId }) => {
  return prisma.supplierInvoice.findMany({
    where: {
      supplierId,
    },
  });
};

export default mySupplierInvoices;
