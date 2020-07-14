import { prisma } from '@';

const medicalHistory = (_, { patientId }) => {
  return prisma.medicalHistory.findMany({
    where: {
      patientId,
    },
  });
};

export default medicalHistory;
