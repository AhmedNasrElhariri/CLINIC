import { prisma } from '@';

const addCompanyDefinition = async (_, { companyDefinition }, { organizationId }) => {
  return prisma.companyDefinition.create({
    data: {
      ...companyDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addCompanyDefinition;
