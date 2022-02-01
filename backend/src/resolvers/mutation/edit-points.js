import { prisma } from '@';

const editPoints = async (_, { points,couponValue }, { organizationId }) => {
  const pointsRows = await prisma.points.findMany({
    where: {
      organizationId,
    },
  });
  const pointsRow = pointsRows[0];
  if (pointsRows.length > 0) {
    return prisma.points.update({
      data: {
        points,
        couponValue,
      },
      where: {
        id: pointsRow.id,
      },
    });
  } else {
    return prisma.points.create({
      data: {
        points,
        couponValue,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  }
};

export default editPoints;
