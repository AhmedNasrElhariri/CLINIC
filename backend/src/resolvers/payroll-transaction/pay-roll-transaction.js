import { prisma } from '@';

const payrollUser = ({ id }) => {
  return prisma.payrollTransaction.findUnique({ where: { id } }).payrollUser();
};

export default payrollUser;
