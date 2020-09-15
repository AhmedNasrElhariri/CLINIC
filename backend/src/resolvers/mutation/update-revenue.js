import { prisma } from '@';

const updateRevenue = async (_, { revenue: { id, ...revenue } }) => {
  return prisma.revenue.update({
    data: {
      ...revenue,
    },
    where: {
      id,
    },
  });
};

export default updateRevenue;
