import { prisma } from '@';

const editInvoice = async (
  _,
  { invoiceId, paid, checkNumber },
  { userId, organizationId }
) => {
  const data = await prisma.supplierInvoice.findUnique({
    where: {
      id: invoiceId,
    },
  });
  const { paid: oldPaid } = data;
  const newPaid = oldPaid + paid;
  await prisma.supplierInvoiceTransaction.create({
    data: {
      paid: paid,
      date: new Date(),
      checkNumber: checkNumber,
      supplierInvoice: {
        connect: {
          id: invoiceId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return prisma.supplierInvoice.update({
    data: {
      paid: newPaid,
    },
    where: {
      id: invoiceId,
    },
  });
};

export default editInvoice;
