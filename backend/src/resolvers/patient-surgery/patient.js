import { prisma } from '@';

const patient = ({ id }) => {
  return prisma.patientSurgery.findUnique({ where: { id } }).patient();
};

export default patient;
