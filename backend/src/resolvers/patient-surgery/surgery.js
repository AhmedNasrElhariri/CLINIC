import { prisma } from '@';

const surgery = ({ id }) => {
  return prisma.patientSurgery.findUnique({ where: { id } }).surgery();
};

export default surgery;
