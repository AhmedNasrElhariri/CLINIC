import { prisma } from '@';

const gatherInsurance = async (_, { gatherInsuranceData }) => {
  const { ids } = gatherInsuranceData;
  await Promise.all(
    ids.map(insuranceId => {
      return prisma.insuranceRevenue.update({
        data: {
          status: 'Cleared',
        },
        where: {
          id: insuranceId,
        },
      });
    })
  );
  return true;
};

export default gatherInsurance;
