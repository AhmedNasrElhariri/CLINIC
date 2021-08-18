import { prisma } from '@';
import { POSITION } from '@/utils/constants';

const listOrganizationDoctors = (_, __, { organizationId }) => {
  return prisma.user.findMany({
    where: {
      organizationId,
      position: POSITION.Doctor,
    },
  });
};

export default listOrganizationDoctors;
