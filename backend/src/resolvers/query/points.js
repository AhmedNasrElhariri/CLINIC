import { prisma } from '@';

const points = async (_, __, { organizationId }) => {
  const pointsRow = await prisma.points.findMany({
    where: {
      organizationId,
    },
  });
  return pointsRow[0];
};

export default points;
