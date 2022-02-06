import { prisma } from '@';

const patientCoupons = async (_, { patientId, all }) => {
  if (all) {
    return prisma.coupon.findMany({
      where: { patientId: patientId },
    });
  } else {
    return prisma.coupon.findMany({
      where: {
        patientId: patientId,
        OR: [{ status: 'Active' }, { status: 'Remaining' }],
      },
    });
  }
};

export default patientCoupons;
