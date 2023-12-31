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
  const totalamount = await prisma.supplierInvoice.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      supplierId: id,
    },
  });
  const sum = totalPaid._sum.paid || 0;
  const sum2 = totalamount._sum.amount || 0;
  const totalUnpaid = sum2 - sum;
  return totalUnpaid;
};
export default totalPaid;
