import { prisma } from '@';

const getPatientField = (_, { patientId }, { organizationId }) => {
  return prisma.patientField.findMany({
    where: {
      patientId: patientId,
    },
    include: {
      patient: true,
      field: true,
    },
  });
};

export default getPatientField;
