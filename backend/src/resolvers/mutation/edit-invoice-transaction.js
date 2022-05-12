import { prisma } from '@';

const editInvoiceTransaction = async (
  _,
  { transactionId, paid },
  { userId, organizationId }
) => {
    
  const oldTransaction = await prisma.supplierInvoiceTransaction.findUnique({
    where: { id: transactionId },
  });
  console.log(transactionId,'transacionId',oldTransaction);
  const { paid: oldTransactionPaid, supplierInvoiceId } = oldTransaction;
  const data = await prisma.supplierInvoice.findUnique({
    where: {
      id: supplierInvoiceId,
    },
  });
  const { paid: oldPaid } = data;
  const newPaid = oldPaid + paid - oldTransactionPaid;
  await prisma.supplierInvoice.update({
    data: {
      paid: newPaid,
    },
    where: {
      id: supplierInvoiceId,
    },
  });
  return prisma.supplierInvoiceTransaction.update({
    data: {
      paid: paid,
    },
    where: {
      id: transactionId,
    },
  });
};

export default editInvoiceTransaction;
