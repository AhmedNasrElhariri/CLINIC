import { prisma } from '@';

const addTransaction = async (
  _,
  { payrollTransaction },
  { organizationId }
) => {
  let { userId, amount, type } = payrollTransaction;
  if (type === 'Advance' || type === 'Deduction') {
    amount = amount * -1;
  }
  const user = await prisma.payrollUser.findOne({
    where: {
      id: userId,
    },
  });
  const { id: payrollUserId, salary, netSalary } = user;
  await prisma.payrollUser.update({
    data: {
      salary: salary,
      netSalary: netSalary + amount,
      organizationId: organizationId,
      user: {
        connect: {
          id: payrollUserId,
        },
      },
    },
    where: {
      id: payrollUserId,
    },
  });
  return prisma.payrollTransaction.create({
    data: {
      amount: amount,
      type: type,
      date: new Date(),
      payrollUser: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addTransaction;
