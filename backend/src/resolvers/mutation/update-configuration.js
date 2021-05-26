import { prisma } from '@';

const updateConfiguration = async (_, { configuration }, { organizationId }) => {
  const sessions = configuration.sessions || [];
  const enableInvoiceCounter = configuration.enableInvoiceCounter || false;
  return prisma.configuration.upsert({
    create: {
      organization: {
        connect: {
          id: organizationId,
        },
      },
      sessions,
      enableInvoiceCounter,
    },
    update: {
      sessions,
      enableInvoiceCounter,
    },
    where: {
      organizationId,
    },
  });
};

export default updateConfiguration;
