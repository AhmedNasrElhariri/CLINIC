import { prisma } from '@';

const couponPointsTransactions = (_, { couponId }) => {
  return prisma.pointsTransactions.findMany({
    where: {
      coupon: {
        id: couponId,
      },
    },
    include: {
      coupon: true,
    },
  });
};

export default couponPointsTransactions;
