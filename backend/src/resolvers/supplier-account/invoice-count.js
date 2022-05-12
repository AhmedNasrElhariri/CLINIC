import { prisma } from '@';

const invoiceCount = async ({ id }) => {
  const invoiceCount = await prisma.supplierInvoice.aggregate({
    count: {
      id: true,
    },
    where: {
      supplierId: id,
    },
  });
  const count = invoiceCount.count.id;
  return count;
};
export default invoiceCount;
