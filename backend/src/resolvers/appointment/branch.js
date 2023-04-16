import { prisma } from '@';

const branch = ({ id, branch }) => {
  if (branch) {
    return branch;
  }
  return prisma.appointment.findUnique({ where: { id } }).branch();
};

export default branch;
