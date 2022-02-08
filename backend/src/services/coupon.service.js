import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
export const couponService = async (
  patientId,
  userId,
  sessions,
  discount,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  others,
  patientName,
  couponsValue
) => {
  const patient = await prisma.patient.findUnique({ where: { id: patientId } });
  const points = await prisma.points.findMany({
    where: { organizationId: organizationId },
  });
  const pointsToGetCoupon = points[0].points;
  const valueOfCoupon = points[0].couponValue;
  let totalPaid = 0;
  let totalPoints = 0;
  const subRed = sessions.reduce(
    (sum, { price, number }) => sum + number * price,
    0
  );
  totalPaid = subRed + others.amount - discount.amount - couponsValue;
  totalPoints = patient.points + totalPaid;
  await prisma.patient.update({
    data: {
      points: totalPoints,
    },
    where: { id: patientId },
  });
  if (totalPoints > pointsToGetCoupon || totalPoints == pointsToGetCoupon) {
    let couponNumbers = 0;
    couponNumbers = Math.floor(totalPoints / pointsToGetCoupon);
    if (couponNumbers > 0 || couponNumbers == 0) {
      const couponPrice =
        totalPoints === pointsToGetCoupon
          ? valueOfCoupon
          : couponNumbers * valueOfCoupon;
      const usedPoints =
        totalPoints === pointsToGetCoupon
          ? pointsToGetCoupon
          : couponNumbers * pointsToGetCoupon;
      const coupon = await prisma.coupon.create({
        data: {
          date: new Date(),
          status: 'Active',
          value: couponPrice,
          remaining: couponPrice,
          patient: {
            connect: {
              id: patientId,
            },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
        },
      });
      await prisma.pointsTransactions.create({
        data: {
          amount: usedPoints,
          date: new Date(),
          coupon: {
            connect: {
              id: coupon.id,
            },
          },
        },
      });
      await prisma.patient.update({
        data: { points: totalPoints - usedPoints },
        where: {
          id: patientId,
        },
      });
    }
  }
};
export const couponAccounting = async (
  userId,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  patientName,
  coupons,
  couponsValue
) => {
  const level = GetLevel(branchId, specialtyId, userID);

  await prisma.expense.create({
    data: Object.assign(
      {
        name: 'Coupon/' + patientName,
        date: new Date(date),
        amount: couponsValue,
        level,
        expenseType: 'Coupon',
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
  });
};

export const updateCoupons = async (coupons, organizationId) => {
  let ids = [];
  coupons.forEach(el => {
    ids.push(el.id);
  });
  const realCoupons = await prisma.coupon.findMany({
    where: { id: { in: ids } },
  });
  const updatedCoupons = coupons.map(c => {
    const coupon = realCoupons.find(rc => rc.id === c.id);
    const remainingValue = coupon.remaining - c.value;
    const status = remainingValue <= 0 ? 'Used' : 'Remaining';
    return {
      where: {
        organizationId: organizationId,
        id: c.id,
      },
      data: {
        status: status,
        remaining: remainingValue,
      },
    };
  });
  await Promise.all(updatedCoupons.map(uc => prisma.coupon.updateMany(uc)));
};
