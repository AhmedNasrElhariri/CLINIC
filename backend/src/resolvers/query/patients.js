import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const patients = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
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
