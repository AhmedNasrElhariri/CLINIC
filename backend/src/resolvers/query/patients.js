import { prisma } from '@';
// import { APIExceptcion } from '@/services/erros.service';

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

  console.log('ids', ids);

  return prisma.patient.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
  });
};

export default patients;
