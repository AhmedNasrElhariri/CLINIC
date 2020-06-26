import { prisma } from '@';

const createPatient = (_, { input: patient }, { organizationId }) => {
  return prisma.patient.create({
    data: { ...patient, organizationId },
  });
};

export default createPatient;
