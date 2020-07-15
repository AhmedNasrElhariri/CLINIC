import { prisma } from '@';

const revenues = (_, { clinicId }) => {
  return prisma.revenue.findMany({
    where: {
      clinicId,
    },
  });
};

export default revenues;
