import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const createExpense = async (_, { expense }, { userId, organizationId }) => {
  const { specialtyId, branchId, userId: userID, ...rest } = expense;
  const level = GetLevel(branchId, specialtyId, userID);
  return prisma.expense.create({
    data: Object.assign(
      {
        ...rest,
        level,
        organization: {
          connect: {
            id: organizationId,
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
  });
};

export default createExpense;
