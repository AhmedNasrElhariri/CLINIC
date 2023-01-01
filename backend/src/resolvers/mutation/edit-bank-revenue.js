import { prisma } from '@';

const editBankTransition = async (_, { bankTransition }, { userId }) => {
  const {
    id,
    specialtyId,
    branchId,
    userId: userID,
    bankId,
    ...rest
  } = bankTransition;
  return prisma.bankRevenue.update({
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
    tag: 'bankRevenue from user',
    where: {
      id,
    },
  });
};

export default editBankTransition;
