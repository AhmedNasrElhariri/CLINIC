import { prisma } from '@';

const myInvoiceCounter = (_, __, { organizationId }) => {
    console.log("hdddddddddddddddddddddddddddddddddddhdhd");
  return prisma.organization.findOne({
    where: {
      id:organizationId,
    }
  });
 
};

export default myInvoiceCounter;
