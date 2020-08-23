import { prisma } from '@';

const patients = async (_, __, { organizationId }) => {
  return prisma.patient.findMany({
    where: {
      organizationId,
    },
  });
};

export default patients;
