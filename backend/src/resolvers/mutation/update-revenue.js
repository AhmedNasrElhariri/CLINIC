import { prisma } from '@';

const updateRevenue = async (
  _,
  { revenue: { id, ...revenue } },
  { userId }
) => {
  const { specialtyId, branchId, userId: userID, ...rest } = revenue;
  return prisma.revenue.update({
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
    tag: 'revenue from user',
    where: {
      id,
    },
  });
};

export default updateRevenue;
