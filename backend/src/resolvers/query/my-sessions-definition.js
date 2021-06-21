import { prisma } from '@';
import { ACTIONS } from '@/utils/constants';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
const mySessionsDefinition = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Session,
    },
    true
  );
  return prisma.sessionDefinition.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
    include: {
      user: true,
      branch: true,
      specialty: true,
    },
  });
};

export default mySessionsDefinition;
