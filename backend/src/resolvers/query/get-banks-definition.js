import { prisma } from '@';

const myBanksDefinition = (_, __, { organizationId }) => {
  return prisma.bankDefinition.findMany({
    where: {
        organizationId,
    },
  });
};

export default myBanksDefinition;
