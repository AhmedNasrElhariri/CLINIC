import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const createRevenue = async (_, { revenue }, { userId, organizationId }) => {
  const {
    specialtyId,
    branchId,
    expenseType,
    userId: userID,
    ...rest
  } = revenue;
  const level = GetLevel(branchId, specialtyId, userID);
  return prisma.revenue.create({
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
    tag: 'revenue from user'
  });
};

export default createRevenue;
