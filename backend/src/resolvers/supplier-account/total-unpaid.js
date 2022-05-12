import { prisma } from '@';

const totalPaid = async ({ id }) => {
  const totalPaid = await prisma.supplierInvoice.aggregate({
    sum: {
      paid: true,
    },
    where: {
      supplierId: id,
    },
  });
  const totalamount = await prisma.supplierInvoice.aggregate({
    sum: {
      amount: true,
    },
    where: {
      supplierId: id,
    },
  });
  const sum = totalPaid.sum.paid || 0;
  const sum2 = totalamount.sum.amount || 0;
  const totalUnpaid = sum2 - sum;
  return totalUnpaid;
};
export default totalPaid;
