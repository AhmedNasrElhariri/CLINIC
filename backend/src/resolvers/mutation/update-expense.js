import { prisma } from '@';

const updateExpense = async (
  _,
  { expense: { id, ...expense } },
  { userId }
) => {
  const { specialtyId, branchId, userId: userID, ...rest } = expense;
  return prisma.expense.update({
    data: Object.assign(
      {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      },
      userID && {
        doctor: {
          connect: {
            id: userID,
          },
        },
      }
    ),
    tag: 'expense from user',
    where: {
      id,
    },
  });
};

export default updateExpense;
