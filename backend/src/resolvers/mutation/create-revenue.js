import { prisma } from '@';

const createRevenue = async (_, { revenue: { clinicId, ...revenue } }) => {
  return prisma.revenue.create({
    data: {
      clinic: {
        connect: {
          id: clinicId,
        },
      },
      ...revenue,
    },
  });
};

export default createRevenue;
