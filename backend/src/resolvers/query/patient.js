import { prisma } from '@';

const patient = (_, { id }) => {
  return prisma.patient.findUnique({ where: { id } });
};

export default patient;
