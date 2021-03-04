import { prisma } from '@';

const myInvoiceCounter = (_, __, { organizationId }) => {
  return prisma.organization.findOne({
    where: {
      id: organizationId,
    },
  });
};

export default myInvoiceCounter;
