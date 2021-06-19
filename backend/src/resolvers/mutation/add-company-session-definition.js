import { prisma } from '@';

const addCompanyDefinition = async (
  _,
  { companySessionDefinition },
  { organizationId }
) => {
  const { companyId, name, price } = companySessionDefinition;
  return prisma.companySessionDefinition.create({
    data: {
      name: name,
      price: price,
      company: {
        connect: {
          id: companyId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addCompanyDefinition;
