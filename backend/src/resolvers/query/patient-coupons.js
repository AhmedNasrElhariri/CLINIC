import { prisma } from '@';

const patientCoupons = (_, { patientId }) => {
  return prisma.coupon.findMany({
    where: {
      patientId: patientId,
      status: 'Active',
    },
  });
};

export default patientCoupons;
