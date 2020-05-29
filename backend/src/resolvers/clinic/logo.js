import { prisma } from '@';

const logo = ({ id }) => {
  return prisma.clinic.findOne({ where: { id } }).logo();
};

export default logo;
