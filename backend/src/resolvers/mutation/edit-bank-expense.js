import { prisma } from '@';

const editBankExpense = async (_, { bankTransition }, { userId }) => {
  const {
    id,
    specialtyId,
    branchId,
    userId: userID,
    bankId,
    ...rest
  } = bankTransition;

  return prisma.bankExpense.update({
    data: Object.assign(
      {
        ...rest,
        bank: {
          connect: {
            id: bankId,
          },
        },
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
    tag: 'bankExpense from user',
    where: {
      id,
    },
  });
};

export default editBankExpense;
