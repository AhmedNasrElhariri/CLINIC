import { prisma } from '@';

const updateConfiguration = async (_, { configuration }, { organizationId }) => {
  const enableInvoiceCounter = configuration.enableInvoiceCounter || false;
  return prisma.configuration.upsert({
    create: {
      organization: {
        connect: {
          id: organizationId,
        },
      },
      enableInvoiceCounter,
    },
    update: {
      enableInvoiceCounter,
    },
    where: {
      organizationId,
    },
  });
};

export default updateConfiguration;
