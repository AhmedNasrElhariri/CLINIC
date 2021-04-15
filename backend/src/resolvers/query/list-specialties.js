import { prisma } from '@';

const listSpecialties = (_, __, { organizationId }) => {
  return prisma.specialty.findMany({
    where: {
      organizationId,
    },
  });
};

export default listSpecialties;
