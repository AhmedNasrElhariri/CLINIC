import { prisma } from '@';

const refuseInsurance = async (_, { refuseInsuranceData }) => {
  const { ids } = refuseInsuranceData;
  await Promise.all(
    ids.map(insuranceId => {
      return prisma.insuranceRevenue.update({
        data: {
          status: 'Refused',
        },
        where: {
          id: insuranceId,
        },
      });
    })
  );
  return true;
};

export default refuseInsurance;
