import { prisma } from '@';

const editBankExpense = async (_, { bankTransition }) => {
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
    where: {
      id,
    },
  });
};

export default editBankExpense;
