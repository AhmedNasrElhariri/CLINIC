import { prisma } from '@';

const surgery = ({ id }) => {
  return prisma.patientSurgery.findOne({ where: { id } }).surgery();
};

export default surgery;
