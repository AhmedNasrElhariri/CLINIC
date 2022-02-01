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
  patientName
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
  totalPaid = subRed + others.amount - discount.amount;
  totalPoints = patient.points + totalPaid;
  await prisma.patient.update({
    data: {
      points: totalPoints,
    },
    where: { id: patientId },
  });
  if (totalPoints > pointsToGetCoupon) {
    let couponNumbers = 0;
    couponNumbers = Math.floor(totalPoints / pointsToGetCoupon);
    if (couponNumbers > 0) {
      const couponPrice = couponNumbers * valueOfCoupon;
      const usedPoints = couponNumbers * pointsToGetCoupon;
      await prisma.coupon.create({
        data: {
          date: new Date(),
          status: 'Active',
          value: couponPrice,
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
  await prisma.revenue.create({
    data: Object.assign(
      {
        name: 'Coupon/' + patientName,
        date: new Date(date),
        amount: couponsValue,
        level,
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
  coupons.forEach(async c => {
    await prisma.coupon.update({
      data: {
        status: 'Used',
      },
      where: {
        id: c,
      },
    });
  });
};
