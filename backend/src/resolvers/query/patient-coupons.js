import { prisma } from '@';

const patientCoupons = (_, { patientId }) => {
  return prisma.coupon.findMany({
    where: {
      patientId: patientId,
      OR: [{ status: 'Active' }, { status: 'Remaining' }],
    },
  });
};

export default patientCoupons;
