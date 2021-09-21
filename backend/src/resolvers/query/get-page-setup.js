import { prisma } from '@';

const getPageSetup = async (_, __, { organizationId }) => {
  const pageSetupRows = await prisma.pageSetup.findMany({
    where: {
      organizationId,
    },
  });
  const pageSetup = pageSetupRows[0] || {};
  return pageSetup;
};

export default getPageSetup;
