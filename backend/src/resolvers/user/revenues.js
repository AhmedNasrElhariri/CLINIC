import { prisma } from '@';

const revenues = ({ id }) => {
  return prisma.user.findUnique({ where: { id } }).revenues();
};

export default revenues;
