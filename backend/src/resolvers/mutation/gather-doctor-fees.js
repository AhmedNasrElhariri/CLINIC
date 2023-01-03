import { prisma } from '@';

const gatherDoctorFees = async (_, { gatherDoctorFeesData }) => {
  const { ids } = gatherDoctorFeesData;
  await Promise.all(
    ids.map(feesId => {
      return prisma.doctorFees.update({
        data: {
          status: 'Cleared',
        },
        where: {
          id: feesId,
        },
      });
    })
  );
  return true;
};

export default gatherDoctorFees;
