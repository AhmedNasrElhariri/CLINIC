import { prisma } from '@';

const updateSMSConf = async (_, { smsConfig }, { organizationId }) => {
  const { enableSMS, orgName, orgPhoneNo } = smsConfig;
  return prisma.configuration.upsert({
    create: {
      organization: {
        connect: {
          id: organizationId,
        },
      },
      enableSMS,
      orgName,
      orgPhoneNo,
      enableInvoiceCounter: false,
    },
    update: {
      enableSMS,
      orgName,
      orgPhoneNo,
    },
    where: {
      organizationId,
    },
  });
};

export default updateSMSConf;
