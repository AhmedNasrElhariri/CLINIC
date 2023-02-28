import { prisma } from '@';

const gatherDoctorFees = async (_, { gatherDoctorFeesData }) => {
  const { ids, type } = gatherDoctorFeesData;
  if (type === 'pay') {
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
  } else {
    await Promise.all(
      ids.map(feesId => {
        return prisma.doctorFees.update({
          data: {
            status: 'Draft',
          },
          where: {
            id: feesId,
          },
        });
      })
    );
  }
  return true;
};

export default gatherDoctorFees;
