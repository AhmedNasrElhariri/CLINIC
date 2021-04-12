import { prisma } from '@';

const addTransaction = async (_, { payRollTransaction },{organizationId}) => {
  let { userId, amount, type } = payRollTransaction;
  if (type === 'Advance' || type === 'Deduction') {
    amount = amount * -1;
  }
  const user = await prisma.payRollUser.findOne({
    where: {
      id: userId,
    },
  });
  const { id: payRollUserId, salary, netSalary } = user;
  await prisma.payRollUser.update({
    data: {
      salary: salary,
      netSalary: netSalary + amount,
      organizationId: organizationId,
      user: {
        connect: {
          id: payRollUserId,
        },
      },
    },
    where:{
      id: payRollUserId,
    }
  });
  return prisma.payRollTransaction.create({
    data: {
      amount: amount,
      type: type,
      date: new Date(),
      payRollUser: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addTransaction;
