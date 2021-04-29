import { prisma } from '@';

const mySaleses = (_, __, { userId }) => {
  return prisma.sales.findMany({
    where: {
      userId,
    },
    include: {
      salesDefinition: true,
    },
  });
};

export default mySaleses;
