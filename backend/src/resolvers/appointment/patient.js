import { prisma } from '@';

const patient = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).patient();
};

export default patient;
