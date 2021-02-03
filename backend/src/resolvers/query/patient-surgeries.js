import { prisma } from '@';

const myPatientSurgeries = (_, { patientId }, { organizationId }) => {
  return prisma.patientSurgery.findMany({
    where: {
      patientId,
      organizationId,
    },
  });
};

export default myPatientSurgeries;
