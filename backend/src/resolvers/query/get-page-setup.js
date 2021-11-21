import { prisma } from '@';

const getPageSetup = async (_, __, { organizationId }) => {
  const pageSetupRows = await prisma.pageSetup.findMany({
    where: {
      organizationId,
    },
  });
  return pageSetupRows;
};

export default getPageSetup;
