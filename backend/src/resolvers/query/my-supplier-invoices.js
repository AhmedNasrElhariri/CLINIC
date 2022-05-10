import { prisma } from '@';

const mySupplierInvoices = async (
  _,
  { supplierId, offset, limit, name },
  { userId, organizationId }
) => {
  const invoices = await prisma.supplierInvoice.findMany({
    where: {
      supplierId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    skip: offset,
    take: limit,
  });
  const invoicesCount = await prisma.supplierInvoice.count({
    where: {
      supplierId,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    skip: offset,
    take: limit,
  });
  const data = {
    invoices: invoices,
    invoicesCount: invoicesCount,
  };
  return data;
};

export default mySupplierInvoices;
