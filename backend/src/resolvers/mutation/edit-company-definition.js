import { prisma } from '@';

const editCompanyDefinition = async (_, { companyDefinition }) => {
  const { id, ...rest } = companyDefinition;

  return prisma.companyDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editCompanyDefinition;
