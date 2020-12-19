import { prisma } from '@';

const myHospitals = (_, __, { organizationId }) => {
  return prisma.hospital.findMany({
    where: {
      organizationId,
    },
  });
};

export default myHospitals;
