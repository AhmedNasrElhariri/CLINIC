import { prisma } from '@';

const myPayrollUsers = _ => {
  return prisma.payrollUser.findMany({});
};

export default myPayrollUsers;
