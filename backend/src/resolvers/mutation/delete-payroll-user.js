import { prisma } from '@';

const deletePayrollUser = async (_, { userId }) => {
  return await prisma.payrollUser.delete({
    where: {
      id: userId,
    },
  });
};

export default deletePayrollUser;
