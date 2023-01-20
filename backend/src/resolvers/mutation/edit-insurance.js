import { prisma } from '@';

const editInsurance = async (_, { insurance }) => {
  const { id, ...rest } = insurance;
  return prisma.insuranceRevenue.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editInsurance;
