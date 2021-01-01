import { prisma } from '@';

const myPatientSurgeries = (_, __, { organizationId }) => {
  return prisma.patientSurgery.findMany({
    where: {
      organizationId,
    },
  });
};

export default myPatientSurgeries;
