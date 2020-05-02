import { prisma } from '@';

const createPatient = (_, { input: patient }) => {
  return prisma.patient.create({
    data: patient,
  });
};

export default createPatient;
