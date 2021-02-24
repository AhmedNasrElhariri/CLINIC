import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const revenues = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Accounting,
    },
    true
  );

  return prisma.revenue.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
  });
};

export default revenues;
