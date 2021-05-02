import { prisma } from '@';

const specialty = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).specialty();
};

export default specialty;
