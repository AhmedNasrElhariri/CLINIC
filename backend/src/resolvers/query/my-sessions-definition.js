import { prisma } from '@';
import { ACTIONS } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
const mySessionsDefinition = async (_, __, { user, organizationId }) => {
  return prisma.sessionDefinition.findMany({
    where: {
      organizationId: organizationId,
    },
  });
};

export default mySessionsDefinition;
