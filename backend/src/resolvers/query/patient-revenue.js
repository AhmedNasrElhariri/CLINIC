import { prisma } from '@';

const patientRevenue = async (_, { patientId }) => {
  return prisma.revenue.findMany({
    where: {
      patientId: patientId,
    },
  });
};

export default patientRevenue;
