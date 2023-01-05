import { prisma } from '@';

const revertInsurance = async (_, { revertInsuranceData }) => {
  const { ids } = revertInsuranceData;
  await Promise.all(
    ids.map(insuranceId => {
      return prisma.insuranceRevenue.update({
        data: {
          status: 'Draft',
        },
        where: {
          id: insuranceId,
        },
      });
    })
  );
  return true;
};

export default revertInsurance;
