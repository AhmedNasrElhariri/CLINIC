import { prisma } from '@';

const labs = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).labs();
};

export default labs;
