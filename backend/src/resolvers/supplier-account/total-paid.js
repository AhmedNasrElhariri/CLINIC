import { prisma } from '@';

const totalPaid = async ({ id }) => {
  const totalPaid = await prisma.supplierInvoice.aggregate({
    _sum: {
      paid: true,
    },
    where: {
      supplierId: id,
    },
  });
  const sum = totalPaid._sum.paid || 0;
  return sum;
};
export default totalPaid;
