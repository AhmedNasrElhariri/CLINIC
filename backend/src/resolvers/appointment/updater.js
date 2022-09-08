import { prisma } from '@';

const updater = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).updater();
};

export default updater;
