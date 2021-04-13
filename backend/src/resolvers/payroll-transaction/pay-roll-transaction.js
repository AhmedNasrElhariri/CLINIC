import { prisma } from '@';

const payrollUser = ({ id }) => {
  return prisma.payrollTransaction.findOne({ where: { id } }).payrollUser();
};

export default payrollUser;
