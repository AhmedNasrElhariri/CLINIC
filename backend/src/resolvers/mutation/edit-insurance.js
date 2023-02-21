import { prisma } from '@';

const editInsurance = async (_, { insurance }) => {
  const { id, sessionId, ...rest } = insurance;
  return prisma.insuranceRevenue.update({
    data: { ...rest, companySessionId: sessionId },
    where: {
      id,
    },
  });
};

export default editInsurance;
