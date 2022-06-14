import { prisma } from '@';

const addSupplierInvoice = async (
  _,
  { supplierInvoice },
  { userId, organizationId }
) => {
  const { supplierId, paid, ...rest } = supplierInvoice;
  const invoice = await prisma.supplierInvoice.create({
    data: {
      ...rest,
      status: 'InProgress',
      paid: paid,
      supplierAccount: {
        connect: {
          id: supplierId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
  const { id } = invoice;
  await prisma.supplierInvoiceTransaction.create({
    data: {
      paid: paid,
      date: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
      supplierInvoice: {
        connect: {
          id: id,
        },
      },
    },
  });
  return invoice;
};

export default addSupplierInvoice;
