import { prisma } from '@';

const createFamilyHistory = async (
  _,
  { familyHistory: { patientId, ...familyHistory } }
) => {
  return prisma.familyHistory.create({
    data: {
      patient: {
        connect: {
          id: patientId,
        },
      },
      ...familyHistory,
    },
  });
};

export default createFamilyHistory;
