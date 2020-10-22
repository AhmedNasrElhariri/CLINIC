import { prisma } from '@';

const images = ({ id }) => {
  return prisma.collection.findOne({ where: { id } }).images();
};

export default images;
