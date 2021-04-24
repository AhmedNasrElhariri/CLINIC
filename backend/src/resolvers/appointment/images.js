import { prisma } from '@';

const images = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).images();
};

export default images;
