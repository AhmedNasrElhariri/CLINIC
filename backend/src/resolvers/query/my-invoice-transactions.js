import { prisma } from '@';

const myInvoiceTransactions = (
  _,
  { invoiceId },
  { userId, organizationId }
) => {
  return prisma.supplierInvoiceTransaction.findMany({
    where: {
      supplierInvoiceId: invoiceId,
    },
    include: {
      user: true,
    },
  });
};

export default myInvoiceTransactions;
