import { prisma } from '@';

const medicineHistory = (_, { patientId }) => {
  return prisma.medicineHistory.findMany({
    where: {
      patientId,
    },
  });
};

export default medicineHistory;
