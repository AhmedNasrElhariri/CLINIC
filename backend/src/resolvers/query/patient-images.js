import { prisma } from '@';

const patientImages = (_, { patientId }) => {
  return prisma.image.findMany({
    where: {
      patientId,
    },
  });
};

export default patientImages;
