import { prisma } from '@';

const addPageSetup = async (_, { pageSetup }, { organizationId, userId }) => {
  const { type } = pageSetup;
  const pageSetupRows = await prisma.pageSetup.findMany({
    where: {
      organizationId,
      type,
    },
  });
  const pageSetupRow = pageSetupRows[0];
  if (pageSetupRows.length > 0) {
    return prisma.pageSetup.update({
      data: {
        ...pageSetup,
      },
      where: {
        id: pageSetupRow.id,
      },
    });
  } else {
    return prisma.pageSetup.create({
      data: {
        ...pageSetup,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  }
};

export default addPageSetup;
