import { prisma } from '@';

const data = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).data();
};

export default data;
