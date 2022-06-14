import { prisma } from '@';

const updateRevenue = async (_, { revenue: { id, ...revenue } }) => {
  const { specialtyId, branchId, userId: userID, ...rest } = revenue;
  return prisma.revenue.update({
    data: Object.assign(
      {
        ...rest,
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

export default updateRevenue;
