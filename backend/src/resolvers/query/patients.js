import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const patients = async (_, __, { userId, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      userId,
      organizationId,
      action: ACTIONS.View_Patient,
    },
    true
  );

  return prisma.patient.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
  });
};

export default patients;
