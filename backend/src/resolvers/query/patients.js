import { prisma } from '@';

const patients = (_, __, { organizationId }) => {
  return prisma.patient.findMany({
    where: {
      organizationId,
    },
  });
};

export default patients;
