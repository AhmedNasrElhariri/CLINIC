import { prisma } from '@';

const images = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).images();
};

export default images;
