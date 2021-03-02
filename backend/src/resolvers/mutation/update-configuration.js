import { prisma } from '@';

const updateConfiguration = async (_, { configuration }, { userId }) => {
  const sessions = configuration.sessions || [];
  const enableInvoiceCounter  = configuration.enableInvoiceCounter || false;
  return prisma.configuration.upsert({
    create: {
      user: {
        connect: {
          id: userId,
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
      userId,
    },
  });
};

export default updateConfiguration;
