import { prisma } from '@';

const patient = (_, { id }) => {
  return prisma.patient.findOne({ where: { id } });
};

export default patient;
