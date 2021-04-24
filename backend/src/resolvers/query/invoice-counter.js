import { prisma } from '@';

const myInvoiceCounter = (_, __, { organizationId }) => {
  return prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
};

export default myInvoiceCounter;
