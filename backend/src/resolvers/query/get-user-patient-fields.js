import { prisma } from '@';

const getUserPatientFields = (_, __, { userId }) => {
  return prisma.patientField.findMany({
    where: {
      userId,
    },
    include: {
      patient: true,
      field: true,
    },
  });
};

export default getUserPatientFields;
