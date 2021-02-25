import { prisma } from '@';

const createRevenue = async (_, { revenue }, { userId }) => {
  return prisma.revenue.create({
    data: {
      ...revenue,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export default createRevenue;
