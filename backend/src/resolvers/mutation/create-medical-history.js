import { prisma } from '@';

const createMedicalHistory = async (
  _,
  { medicalHistory: { patientId, ...medicalHistory } }
) => {
  return prisma.medicalHistory.create({
    data: {
      patient: {
        connect: {
          id: patientId,
        },
      },
      ...medicalHistory,
    },
  });
};

export default createMedicalHistory;
