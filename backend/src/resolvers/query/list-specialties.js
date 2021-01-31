import { prisma } from '@';

const listSpecialties = (_, { organizationId }) => {
  return prisma.specialty.findMany({
    where: {
      organizationId,
    },
  });
};

export default listSpecialties;
