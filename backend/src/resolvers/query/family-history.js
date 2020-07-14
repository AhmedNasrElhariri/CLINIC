import { prisma } from '@';

const familyHistory = (_, { patientId }) => {
  return prisma.familyHistory.findMany({
    where: {
      patientId,
    },
  });
};

export default familyHistory;
