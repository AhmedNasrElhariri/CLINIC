import { prisma } from '@';

const invoiceCount = async ({ id }) => {
  const invoiceCount = await prisma.supplierInvoice.aggregate({
    _count: {
      id: true,
    },
    where: {
      supplierId: id,
    },
  });
  const count = invoiceCount._count.id;
  return count;
};
export default invoiceCount;
