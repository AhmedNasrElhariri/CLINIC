import { prisma } from '@';

const editCompanyDefinition = async (_, { companySessionDefinition }) => {
  const { id, name, price, companyId } = companySessionDefinition;

  return prisma.companySessionDefinition.update({
    data: {
      name: name,
      price: price,
      company: {
        connect: {
          id: companyId,
        },
      },
    },
    where: {
      id,
    },
  });
};

export default editCompanyDefinition;
