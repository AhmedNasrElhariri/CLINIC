import { prisma } from '@';

const rules = ({ id }) => {
  return prisma.permission.findUnique({ where: { id } }).rules();
};

export default rules;
